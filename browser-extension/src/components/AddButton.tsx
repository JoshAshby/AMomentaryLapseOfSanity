/** @jsx createElement */
import { createElement, Context } from "@bikeshaving/crank"

import { IScrapeConfig } from "../lib/dataLayer"
import { ScrapeConfig } from "../actions"

function* AddButton(
  this: Context,
  {
    scrape_config,
    selector,
  }: {
    scrape_config: IScrapeConfig
    selector: IScrapeConfig["extraction_selectors"][0]
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

export default AddButton
