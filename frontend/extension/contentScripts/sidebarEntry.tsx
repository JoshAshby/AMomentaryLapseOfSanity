/** @jsx createElement */
import { createElement, Context, Fragment, Children } from "@bikeshaving/crank"
import { renderer } from "@bikeshaving/crank/dom"

import finder from "@medv/finder"

import Frame from "../components/Frame"

import browser from "webextension-polyfill"

function ErrorBoundary({ children }: { children?: Children }) {
  try {
    return <Fragment>{children}</Fragment>
  } catch (e) {
    return <p>{e.message}</p>
  }
}

async function* SiteScrapeConfig(this: Context) {
  let scrape_config: any

  const load = async () => {
    const res = await fetch(
      `http://localhost:3000/api/v1/site?url=${window.location.href}`,
      {
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      }
    )

    const json = await res.json()
    scrape_config = json["scrape_config"]

    this.set("scrape_config", scrape_config)

    this.refresh()
  }

  const remove = (id: number, idx: number) => async (ev: MouseEvent) => {
    ev.preventDefault()
    ev.stopPropagation()

    await fetch(
      `http://localhost:3000/api/v1/scrape_config/${id}/extraction/${idx}`,
      {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      }
    )

    await load()
  }

  this.addEventListener("scrape_config.reload", load)

  await load()

  for await ({} of this) {
    yield (
      <Fragment>
        <strong>ID:</strong> {scrape_config.id}
        <table style="width: 100%;">
          <thead>
            <tr>
              <th style="width: 45%;">Selection</th>
              <th style="width: 45%;">Content</th>
              <th style="width: 10%;">Actions</th>
            </tr>
          </thead>
          <tbody>
            {scrape_config.extraction_selectors.map(
              (selector: string, idx: number) => {
                const node = document.querySelector(selector) as HTMLElement

                return (
                  <SelectorRow selector={selector} node={node} crank-key={idx}>
                    <button onclick={remove(scrape_config.id, idx)}>-</button>
                  </SelectorRow>
                )
              }
            )}
          </tbody>
        </table>
        <Selector scrape_config={scrape_config} />
      </Fragment>
    )
  }
}

function SelectorRow({
  selector,
  node,
  children,
}: {
  selector: string
  node: HTMLElement
  children?: Children
}) {
  const outline = () => {}

  return (
    <tr onmouseenter={outline} onmouseleave={outline}>
      <td>{selector}</td>
      <td>{node.innerText.substring(0, 80)}</td>
      <td>{children}</td>
    </tr>
  )
}

function* Selector(this: Context, { scrape_config }: { scrape_config: any }) {
  let selectors: Record<string, HTMLElement> = {}

  const findSelectors = (event: MouseEvent) => {
    if (frame!.contains(event.target as HTMLElement)) return

    event.preventDefault()
    event.stopPropagation()
    document.removeEventListener("click", findSelectors)

    const hovered = Array.from(document.querySelectorAll(":hover"))
      .filter((node) => !frame!.contains(node))
      .reverse()

    selectors = hovered.reduce(
      (memo, node) => ({ ...memo, [finder(node)]: node }),
      {}
    )

    toggleFrame()

    this.refresh()
  }

  const startSelecting = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()

    toggleFrame()

    document.addEventListener("click", findSelectors)
  }

  const add = (id: number, selector: string, sc: any) => async (
    ev: MouseEvent
  ) => {
    await fetch(`http://localhost:3000/api/v1/scrape_config/${id}`, {
      method: "PATCH",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        extraction_selectors: [
          ...this.get("scrape_config").extraction_selectors,
          selector,
        ],
      }),
    })

    this.dispatchEvent(
      new CustomEvent("scrape_config.reload", { bubbles: true })
    )
  }

  // document.addEventListener("selector.start", startSelecting)

  while (true) {
    yield (
      <Fragment>
        <button onclick={startSelecting}>Add Extraction</button>

        <table style="width: 100%;">
          <thead>
            <tr>
              <th style="width: 45%;">Selection</th>
              <th style="width: 45%;">Content</th>
              <th style="width: 10%;">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(selectors).map(([selector, node], idx) => (
              <SelectorRow selector={selector} node={node} crank-key={idx}>
                <button
                  onclick={add(scrape_config.id, selector, scrape_config)}
                >
                  +
                </button>
              </SelectorRow>
            ))}
          </tbody>
        </table>
      </Fragment>
    )
  }
}

const root = document.createElement("div")

let frame: Element | undefined

const toggleFrame = () => {
  if (document.contains(root)) {
    frame!.dispatchEvent(new CustomEvent("frame.toggle", { bubbles: true }))

    return
  }

  document.body.appendChild(root)

  Promise.resolve(
    renderer.render(
      <ErrorBoundary>
        <Frame initializeOpen>
          <SiteScrapeConfig />
        </Frame>
      </ErrorBoundary>,
      root
    )
  ).then((f) => (frame = f.firstElementChild!))
}

browser.runtime.onMessage.addListener((message, sender) => {
  const msg = JSON.parse(message)

  console.debug(`Got message ${msg.action}`, { payload: msg.payload, sender })

  switch (msg.action) {
    case "open":
      toggleFrame()
      break
  }
})
