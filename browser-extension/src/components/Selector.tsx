/** @jsx createElement */
import { createElement, Fragment, Context } from "@bikeshaving/crank"

import SelectorTable from "./SelectorTable"
import SelectorRow from "./SelectorRow"
import StartSelectingButton from "./StartSelectingButton"
import AddButton from "./AddButton"

import finder from "@medv/finder"

import { Selection } from "../actions"

const ignoreTags = ["HTML", "BODY"]

const selectorsForHover = (frame: Element) => {
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

const removeHighlight = () => {
  ele.classList.remove("amlos_highlight")
}

function* Selector(
  this: Context,
  { scrape_config, frame }: { scrape_config: any; frame: Element }
) {
  let selectors: Record<string, HTMLElement> = {}

  const setSelectors = (ev: MouseEvent) => {
    ev.stopImmediatePropagation()
    ev.preventDefault()
    ev.stopPropagation()

    if (frame?.contains(ev.target as HTMLElement)) return

    stopSelecting()

    selectors = selectorsForHover(frame)

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

export default Selector
