/** @jsx createElement */
import { createElement, Context } from "@bikeshaving/crank"

import { IScrapeConfig } from "../lib/dataLayer"
import { ScrapeConfig } from "../actions"

function* RemoveButton(
  this: Context,
  { scrape_config, idx }: { scrape_config: IScrapeConfig; idx: number }
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

export default RemoveButton
