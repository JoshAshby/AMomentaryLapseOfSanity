/** @jsx createElement */
import { createElement, Fragment, Context, Children } from "@bikeshaving/crank"
import { renderer } from "@bikeshaving/crank/dom"

import finder from "@medv/finder"

import Frame from "../components/Frame"

import browser from "webextension-polyfill"

const iframeStyle = `
  border: none;
  width: 100%;
  height: 100%;
`

const root = document.createElement("div")

let frame: HTMLIFrameElement | undefined

const injectFrame = async () => {
  if (document.contains(root)) return

  document.body.appendChild(root)

  const frameContainer = await Promise.resolve(
    renderer.render(
      <Frame>
        <iframe style={iframeStyle} />
      </Frame>,
      root
    )
  )

  frame = frameContainer.querySelector("iframe")

  let { clientHeight: height } = frame
  document.body.style.marginBottom = `${height}px`

  populateFrame(frame)
}

/**
 * Loads the raw HTML for the frame, dups the styles and injects it into the frame,
 * and finally initializing the rendering for the frame.
 *
 * Why do we have to do this instead of something sane like setting the iframes
 * src to the html page? A few reasons:
 *
 * 1) Theres a lot of back and forth of data for getting the selectors, nodes
 * and other data out of the root document that makes communication between an iframe
 * and this content script difficult to cleanly pull off. By injecting the iframe and
 * rendering to it from the content script those issues magically disappear as the
 * code is all in the same context.
 *
 * 2) FireFox has a few bugs around styles, css links and other items injected by
 * content scripts not having CSP applied to them. It works for style attributes, but
 * that quickly gets out of hand for UI's, HOWEVER, content loaded inside of an iframe
 * that the content script injects has the correct CSP ignoring behavior, so we
 * can style an iframe with style attributes and then load the iframe with normal
 * style and link tags without issue. the only problem is that you have to recreate
 * those tags if you are injecting HTML from a server response, because of other bugs.
 *
 * Yeah, it's all sadness, but it's functional sadness.
 *
 * @param f Iframe element to load the content into
 */
const populateFrame = (f: HTMLIFrameElement) =>
  f.addEventListener(
    "load",
    async () => {
      const frameDoc = f.contentDocument

      const sidebarContentRes = await fetch(
        browser.extension.getURL("sidebar/index.html")
      )

      const sidebarContentText = await sidebarContentRes.text()

      const sidebarContent = new DOMParser().parseFromString(
        sidebarContentText,
        "text/html"
      )

      sidebarContent.querySelectorAll("style").forEach((node) => {
        const styleText = node.textContent
        node.parentNode.removeChild(node)
        node = frameDoc.createElement("style")
        node.textContent = styleText
        sidebarContent.head.appendChild(node)
      })

      sidebarContent.querySelectorAll("link").forEach((node) => {
        const newNode = frameDoc.adoptNode(node.cloneNode())
        node.parentNode.removeChild(node)
        sidebarContent.head.appendChild(newNode)
      })

      frameDoc.replaceChild(
        frameDoc.adoptNode(sidebarContent.documentElement),
        frameDoc.documentElement
      )

      await renderSidebar(
        window.location.href,
        frameDoc.getElementById("app-root")
      )
    },
    { once: true }
  )

browser.runtime.onMessage.addListener((message, sender) => {
  const msg = JSON.parse(message)

  console.debug(`Got message ${msg.action}`, { payload: msg.payload, sender })

  switch (msg.action) {
    case "open":
      injectFrame()
      break
  }
})

interface CannedRequestOpts extends RequestInit {
  querystring?: Record<string, any>
  json?: any
}

interface CannedRequest {
  <T = any>(path: string, {}: CannedRequestOpts): Promise<T>
}

const baseUrl = "http://localhost:3000/"
const request: CannedRequest = async (
  path,
  { querystring, json, body, headers, ...requestInit } = { method: "GET" }
) => {
  const url = new URL(path, baseUrl)

  if (querystring)
    Object.entries(querystring).forEach(([key, value]) =>
      url.searchParams.append(key, value)
    )

  let stringBody = body
  if (json) stringBody = JSON.stringify(json)

  const res = await fetch(url.href, {
    ...requestInit,
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: stringBody,
  })

  return res.json()
}

interface ScrapeConfig {
  id: string
  url: string
  extraction_selectors: string[]
  updated_at: string
  created_at: string
}

const loadForUrl = async (url: string) =>
  await request<{ scrape_config: ScrapeConfig }>(`/api/v1/site`, {
    querystring: { url },
  })

const addSelector = async (
  id: ScrapeConfig["id"],
  selector: ScrapeConfig["extraction_selectors"][0]
) =>
  await request<{ scrape_config: ScrapeConfig }>(
    `/api/v1/scrape_config/${id}/extraction`,
    {
      method: "PATCH",
      json: {
        extraction_selector: selector,
      },
    }
  )

const removeSelector = async (id: ScrapeConfig["id"], idx: number) =>
  await request<{ scrape_config: ScrapeConfig }>(
    `/api/v1/scrape_config/${id}/extraction/${idx}`,
    {
      method: "DELETE",
    }
  )

function createAction<T, U = T>(
  type: string,
  handlerLogic?: (args: T, context: Context) => void,
  dataTransformer?: (args: U) => T
) {
  const dataFunc = dataTransformer || ((a: U) => (a as unknown) as T)

  const creator = (...args: Parameters<typeof dataFunc>) =>
    new CustomEvent(type, {
      bubbles: true,
      detail: { data: dataFunc(...args), creator },
    })

  creator.type = type

  function handler(this: Context, event: Event) {
    const ev = event as ReturnType<typeof creator>
    if (!ev.detail) return

    handlerLogic?.(ev.detail.data, this)
  }

  creator.handler = handler

  return creator
}

const ScrapeConfig = {
  addSelector: createAction(
    "scrape_config.add_selector",
    async ({ id, selector }, context) => {
      await addSelector(id, selector)

      context.refresh()
    },
    ({
      scrape_config,
      selector,
    }: {
      scrape_config: ScrapeConfig
      selector: ScrapeConfig["extraction_selectors"][0]
    }) => ({ id: scrape_config.id, selector })
  ),
  removeSelector: createAction(
    "scrape_config.remove_selector",
    async ({ id, idx }, context) => {
      await removeSelector(id, idx)

      context.refresh()
    },
    ({ scrape_config, idx }: { scrape_config: ScrapeConfig; idx: number }) => ({
      id: scrape_config.id,
      idx,
    })
  ),
}

const Selection = {
  start: createAction("selection.start"),
}

function SelectorTable({ children }: { children: Children }) {
  return (
    <table style="width: 100%;">
      <thead>
        <tr>
          <th style="width: 45%;">Selection</th>
          <th style="width: 45%;">Content</th>
          <th style="width: 10%;">Actions</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  )
}

function SelectorRow({
  selector,
  node,
  children,
  ...props
}: {
  selector: string
  node: HTMLElement
  children?: Children
}) {
  return (
    <tr {...props}>
      <td>{selector}</td>
      <td>{node.innerText.substring(0, 80)}</td>
      <td>{children}</td>
    </tr>
  )
}

function* StartSelectingButton(this: Context) {
  this.addEventListener("click", (ev) => {
    ev.preventDefault()
    ev.stopPropagation()

    this.dispatchEvent(Selection.start({}))
  })

  while (true) {
    yield <button>Add Extraction</button>
  }
}

function* AddButton(
  this: Context,
  {
    scrape_config,
    selector,
  }: {
    scrape_config: ScrapeConfig
    selector: ScrapeConfig["extraction_selectors"][0]
  }
) {
  this.addEventListener("click", (ev) => {
    ev.preventDefault()
    ev.stopPropagation()

    this.dispatchEvent(ScrapeConfig.addSelector({ scrape_config, selector }))
  })

  for ({ scrape_config, selector } of this) {
    yield <button>+</button>
  }
}

function* RemoveButton(
  this: Context,
  { scrape_config, idx }: { scrape_config: ScrapeConfig; idx: number }
) {
  this.addEventListener("click", (ev) => {
    ev.preventDefault()
    ev.stopPropagation()

    this.dispatchEvent(ScrapeConfig.removeSelector({ scrape_config, idx }))
  })

  for ({ scrape_config, idx } of this) {
    yield <button>-</button>
  }
}

function* Selector(this: Context, { scrape_config }: { scrape_config: any }) {
  let selectors: Record<string, HTMLElement> = {}

  const ignoreTags = ["HTML", "BODY"]

  const selectorsForHover = () => {
    const hovered = Array.from(document.querySelectorAll(":hover"))
      .filter(
        (node) => !frame!.contains(node) && !ignoreTags.includes(node.nodeName)
      )
      .reverse()

    return hovered.reduce(
      (memo, node) => ({
        ...memo,
        [finder(node, {
          className: (name) => !name.startsWith("amlos_"),
          seedMinLength: 4,
        })]: node,
      }),
      {}
    )
  }

  let ele: Element
  const addHighlight = (ev: MouseEvent) => {
    ele = ev.target as Element
    ele.classList.add("amlos_highlight")
  }

  const removeHighlight = (ev: MouseEvent) => {
    ele.classList.remove("amlos_highlight")
  }

  const setSelectors = (ev: MouseEvent) => {
    ev.stopImmediatePropagation()
    ev.preventDefault()
    ev.stopPropagation()

    if (frame?.contains(ev.target as HTMLElement)) return

    stopSelecting()

    selectors = selectorsForHover()

    this.refresh()
  }

  const stopSelecting = () => {
    document.removeEventListener("click", setSelectors, { capture: true })
    document.removeEventListener("mouseover", addHighlight)
    document.removeEventListener("mouseout", removeHighlight)

    removeHighlight()
  }

  const startSelecting = () => {
    document.addEventListener("click", setSelectors, { capture: true })
    document.addEventListener("mouseover", addHighlight)
    document.addEventListener("mouseout", removeHighlight)
  }

  this.addEventListener(Selection.start.type, startSelecting)

  const style = `
    .amlos_highlight {
      outline: fuchsia dotted 1px !important;
      cursor: crosshair !important;
    }
  `

  const styleTag = document.createElement("style")
  styleTag.textContent = style
  document.head.appendChild(styleTag)

  while (true) {
    yield (
      <Fragment>
        <StartSelectingButton />

        <SelectorTable>
          {Object.entries(selectors).map(([selector, node], idx) => (
            <SelectorRow selector={selector} node={node} crank-key={idx}>
              <AddButton scrape_config={scrape_config} selector={selector} />
            </SelectorRow>
          ))}
        </SelectorTable>
      </Fragment>
    )
  }
}

async function* SiteScrapeConfig(this: Context, { url }: { url: string }) {
  for (const ac of Object.values(ScrapeConfig)) {
    this.addEventListener(ac.type, ac.handler)
  }

  for await ({} of this) {
    let { scrape_config } = await loadForUrl(url)

    yield (
      <Fragment>
        <strong>ID:</strong> {scrape_config.id}
        <SelectorTable>
          {scrape_config.extraction_selectors.map((selector, idx) => {
            const node = document.querySelector(selector) as HTMLElement

            return (
              <SelectorRow selector={selector} node={node} crank-key={idx}>
                <RemoveButton scrape_config={scrape_config} idx={idx} />
              </SelectorRow>
            )
          })}
        </SelectorTable>
        <Selector scrape_config={scrape_config} />
      </Fragment>
    )
  }
}

const renderSidebar = async (url, root) =>
  renderer.render(<SiteScrapeConfig url={url} />, root)
