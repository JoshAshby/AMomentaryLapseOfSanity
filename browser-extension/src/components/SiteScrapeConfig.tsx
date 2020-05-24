/** @jsx createElement */
import { createElement, Fragment, Context } from "@bikeshaving/crank"

import SelectorRow from "./SelectorRow"
import SelectorTable from "./SelectorTable"
import Selector from "./Selector"
import RemoveButton from "./RemoveButton"

import { getForUrl } from "../lib/dataLayer"
import { ScrapeConfig } from "../actions"

async function* SiteScrapeConfig(
  this: Context,
  { url, frame }: { url: string; frame: Element }
) {
  for (const ac of Object.values(ScrapeConfig)) {
    this.addEventListener(ac.type, ac.handler)
  }

  for await ({} of this) {
    let { scrape_config } = await getForUrl(url)

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
        <Selector frame={frame} scrape_config={scrape_config} />
      </Fragment>
    )
  }
}

export default SiteScrapeConfig
