/** @jsx createElement */
import { createElement } from "@bikeshaving/crank"
import { renderer } from "@bikeshaving/crank/dom"

import browser from "webextension-polyfill"

import Frame from "../components/Frame"
import SiteScrapeConfig from "../components/SiteScrapeConfig"

import populateFrame from "../lib/populateFrame"
import addStyle from "../lib/addStyle"
import Messages from "../Messages"
import { FrameState } from "../actions"

const styles = `
.amlos_highlight {
  outline: fuchsia dotted 1px !important;
  cursor: crosshair !important;
}

.amlos_iframe-container {
  position: fixed;
  bottom: 0px;
  right: 0px;
  width: 100%;
  height: 65%;
  max-height: 350px;
  box-sizing: border-box;
  z-index: 10000;
  transition: transform .30s cubic-bezier(0, 0, 0.3, 1);
}

.amlos_iframe-container.-hidden {
  cursor: pointer;
  transform: translateY(94%);
}

.amlos_iframe-container.-hidden > iframe {
  pointer-events: none;
}

.amlos_iframe-container.-hidden:hover {
  transform: translateY(92%);
}

.amlos_iframe {
  border: none;
  width: 100%;
  height: 100%;
}
`

const root = document.createElement("div")

const injectFrame = async () => {
  document.body.appendChild(root)

  addStyle(styles)

  const sidebarUrl = browser.extension.getURL("sidebar/index.html")
  const sidebarContentRes = await fetch(sidebarUrl)

  const sidebarContentText = await sidebarContentRes.text()

  const sidebarContent = new DOMParser().parseFromString(
    sidebarContentText,
    "text/html"
  )

  const frameContainer = await renderer.render(
    <Frame>
      <iframe class="amlos_iframe" />
    </Frame>,
    root
  )

  const frame = frameContainer.querySelector("iframe")!

  const frameDoc = await populateFrame(frame, sidebarContent)

  await renderer.render(
    <SiteScrapeConfig url={window.location.href} frame={frame} />,
    frameDoc.getElementById("app-root")!
  )

  frameContainer.addEventListener("click", toggleFrame)
  frameDoc.addEventListener(FrameState.toggle.type, toggleFrame)
}

const toggleFrame = () => {
  if (!document.contains(root)) return injectFrame()
  root.querySelector("div")!.classList.toggle("-hidden")
}

browser.runtime.onMessage.addListener((message, sender) => {
  const msg = JSON.parse(message)

  console.debug(`Got message ${msg.action}`, { payload: msg.payload, sender })

  switch (msg.action) {
    case Messages.toggleFrame.type:
      toggleFrame()
      break
  }
})

export { toggleFrame }
