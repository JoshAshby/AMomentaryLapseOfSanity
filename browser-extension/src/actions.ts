import createAction from "./lib/createAction"

import { IScrapeConfig, addSelector, removeSelector } from "./lib/dataLayer"

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
      scrape_config: IScrapeConfig
      selector: IScrapeConfig["extraction_selectors"][0]
    }) => ({ id: scrape_config.id, selector })
  ),
  removeSelector: createAction(
    "scrape_config.remove_selector",
    async ({ id, idx }, context) => {
      await removeSelector(id, idx)

      context.refresh()
    },
    ({
      scrape_config,
      idx,
    }: {
      scrape_config: IScrapeConfig
      idx: number
    }) => ({
      id: scrape_config.id,
      idx,
    })
  ),
}

const Selection = {
  start: createAction("selection.start"),
}

const FrameState = {
  toggle: createAction("frame.toggle"),
}

export { ScrapeConfig, Selection, FrameState }
