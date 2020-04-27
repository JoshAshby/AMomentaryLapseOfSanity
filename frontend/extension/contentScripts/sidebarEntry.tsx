/** @jsx createElement */
import { createElement } from "@bikeshaving/crank"
import { renderer } from "@bikeshaving/crank/dom"

import browser from "webextension-polyfill"

import Frame from "../components/Frame"

const sidebarUrl = browser.runtime.getURL("webAccessible/sidebar.html")
const root = document.createElement("div")

const toggleFrame = () => {
  if (document.contains(root)) {
    root.firstChild?.dispatchEvent(
      new CustomEvent("frame.toggle", { bubbles: true })
    )
    return
  }

  document.body.appendChild(root)
  renderer.render(<Frame url={sidebarUrl} />, root)
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
