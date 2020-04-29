/** @jsx createElement */
import { createElement, Context, Fragment, Children } from "@bikeshaving/crank"
import { renderer } from "@bikeshaving/crank/dom"

import finder from "@medv/finder"

import Frame from "../components/Frame"

const root = document.getElementById("app-root")!
let frame: Element | undefined

const toggleFrame = () => {
  if (frame) {
    frame.dispatchEvent(new CustomEvent("frame.toggle", { bubbles: true }))
    return
  }

  Promise.resolve(
    renderer.render(
      <Frame initializeOpen>
        <ErrorBoundary>
          <SiteScrapeConfig />
          <Selector />
        </ErrorBoundary>
      </Frame>,
      root
    )
  ).then((f) => (frame = f))

  console.log(frame)
}

document.addEventListener("loaded", () => toggleFrame())

function ErrorBoundary({ children }: { children?: Children }) {
  try {
    return <Fragment>{children}</Fragment>
  } catch (e) {
    return <p>{e.message}</p>
  }
}

async function* SiteScrapeConfig(this: Context) {
  const res = await fetch(
    `http://localhost:3000/api/v1/site?url=${window.location.href}`,
    {
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    }
  )

  const { scrape_config } = await res.json()

  for await ({} of this) {
    yield (
      <Fragment>
        <strong style="font-weight: 100;">ID:</strong> {scrape_config.id}
        <table>
          <thead>
            <tr>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {scrape_config.extraction_selectors.map(
              (selector: string, idx: number) => {
                const node = document.querySelector(selector) as HTMLElement

                return (
                  <SelectorRow
                    selector={selector}
                    node={node}
                    crank-key={idx}
                  />
                )
              }
            )}
          </tbody>
        </table>
      </Fragment>
    )
  }
}

function SelectorRow({
  selector,
  node,
  actions,
}: {
  selector: string
  node: HTMLElement
  actions?: Children
}) {
  const outline = () => {}

  return (
    <tr onmouseenter={outline} onmouseleave={outline}>
      <td>{selector}</td>
      <td>{node.innerText}</td>
      <td>{actions}</td>
    </tr>
  )
}

function* Selector(this: Context) {
  let selectors: Record<string, HTMLElement> = {}

  const findSelectors = (event: MouseEvent) => {
    if (root.contains(event.target as HTMLElement)) return

    event.preventDefault()
    event.stopPropagation()
    document.removeEventListener("click", findSelectors)

    const hovered = Array.from(document.querySelectorAll(":hover"))
      .filter((node) => !root.contains(node))
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

  // document.addEventListener("selector.start", startSelecting)

  while (true) {
    yield (
      <Fragment>
        <button onclick={startSelecting}>Add Extraction</button>

        <table>
          <tbody>
            {Object.entries(selectors).map(([selector, node], idx) => (
              <SelectorRow selector={selector} node={node} crank-key={idx} />
            ))}
          </tbody>
        </table>
      </Fragment>
    )
  }
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
