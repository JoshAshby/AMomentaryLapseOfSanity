/** @jsx createElement */
import { createElement } from "@bikeshaving/crank"
import { renderer } from "@bikeshaving/crank/dom"

import finder from "@medv/finder"

import Frame from "../components/Frame"

import browser from "webextension-polyfill"

const selectorsForHover = () => {
  const hovered = Array.from(document.querySelectorAll(":hover"))
    .filter((node) => !frame!.contains(node))
    .reverse()

  return hovered.reduce((memo, node) => ({ ...memo, [finder(node)]: node }), {})
}

const setSelectors = (ev: MouseEvent) => {
  if (frame?.contains(ev.target as HTMLElement)) return

  ev.preventDefault()
  ev.stopPropagation()
  document.removeEventListener("click", setSelectors)

  const selectors = selectorsForHover()

  console.log(selectors)
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
        <iframe src={browser.extension.getURL("sidebar/index.html")} />
      </Frame>,
      root
    )
  )
    .then((f) => (frame = f.firstElementChild!))
    .then(console.log)
}

browser.runtime.onMessage.addListener((message, sender) => {
  const msg = JSON.parse(message)

  console.debug(`Got message ${msg.action}`, { payload: msg.payload, sender })

  switch (msg.action) {
    case "open":
      toggleFrame()
      break

    case "select":
      document.addEventListener("click", setSelectors)
      break
  }
})
