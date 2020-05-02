/** @jsx createElement */
import { createElement, Context, Fragment, Children } from "@bikeshaving/crank"
import { renderer } from "@bikeshaving/crank/dom"

import finder from "@medv/finder"

import Frame from "../components/Frame"

import browser from "webextension-polyfill"

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

const selectorsForHover = () => {
  const hovered = Array.from(document.querySelectorAll(":hover"))
    .filter((node) => !frame!.contains(node))
    .reverse()

  return hovered.reduce((memo, node) => ({ ...memo, [finder(node)]: node }), {})
}

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

  const setSelectors = (ev: MouseEvent) => {
    if (frame?.contains(ev.target as HTMLElement)) return

    ev.preventDefault()
    ev.stopPropagation()
    document.removeEventListener("click", setSelectors)

    selectors = selectorsForHover()

    this.refresh()
    toggleFrame()
  }

  this.addEventListener(Selection.start.type, (event) => {
    toggleFrame()
    document.addEventListener("click", setSelectors)
  })

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

async function* SiteScrapeConfig(this: Context) {
  for (const ac of Object.values(ScrapeConfig)) {
    this.addEventListener(ac.type, ac.handler)
  }

  for await ({} of this) {
    let { scrape_config } = await loadForUrl(window.location.href)

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
      <Frame initializeOpen>
        <SiteScrapeConfig />
      </Frame>,
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
