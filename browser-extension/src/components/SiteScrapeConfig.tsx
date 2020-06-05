/** @jsx createElement */
import { createElement, Fragment, Context } from "@bikeshaving/crank"

import SelectorRow from "./SelectorRow"
import SelectorTable from "./SelectorTable"

import RemoveButton from "./RemoveButton"
import StartSelectingButton from "./StartSelectingButton"
import AddButton from "./AddButton"

import { ScrapeConfig, Selection } from "../actions"

import findSelectors from "../lib/findSelectors"
import { addHighlight, removeHighlight } from "../lib/highlightElement"
import { getForUrl } from "../lib/dataLayer"

import { toggleFrame } from "../contentScripts/sidebarEntry"

function* CloseButton(this: Context) {
  this.addEventListener("click", (e) => {
    e.preventDefault()
    toggleFrame()
  })

  while (true) {
    yield <button>X</button>
  }
}

async function* SiteScrapeConfig(
  this: Context,
  { url, frame }: { url: string; frame: Element }
) {
  for (const ac of Object.values(ScrapeConfig)) {
    this.addEventListener(ac.type, ac.handler)
  }

  let selectors: Record<string, NodeListOf<Element>> = {}

  const setSelectors = (ev: MouseEvent) => {
    ev.stopImmediatePropagation()
    ev.preventDefault()
    ev.stopPropagation()

    if (frame?.contains(ev.target as HTMLElement)) return

    stopSelecting()

    selectors = findSelectors(document.querySelectorAll(":hover"), {
      ignoreElements: [frame],
    })

    toggleFrame()

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

  for await ({} of this) {
    let { scrape_config } = await getForUrl(url)

    yield (
      <Fragment>
        <div style="display: flex; justify-content: space-between;">
          <StartSelectingButton />
          <CloseButton />
        </div>

        <h3>Existing Selectors</h3>
        <SelectorTable>
          {scrape_config.extraction_selectors.map((selector, idx) => {
            const nodes = document.querySelectorAll(selector)

            return (
              <SelectorRow selector={selector} nodes={nodes} crank-key={idx}>
                <RemoveButton scrape_config={scrape_config} idx={idx} />
              </SelectorRow>
            )
          })}
        </SelectorTable>

        <h3>Found Selectors</h3>
        <SelectorTable>
          {Object.entries(selectors).map(([selector, nodes], idx) => (
            <SelectorRow selector={selector} nodes={nodes} crank-key={idx}>
              <AddButton scrape_config={scrape_config} selector={selector} />
            </SelectorRow>
          ))}
        </SelectorTable>
      </Fragment>
    )
  }
}

export default SiteScrapeConfig
