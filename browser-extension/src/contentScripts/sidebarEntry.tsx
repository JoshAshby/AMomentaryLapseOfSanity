/** @jsx createElement */
import { createElement } from "@bikeshaving/crank"
import { renderer } from "@bikeshaving/crank/dom"

import browser from "webextension-polyfill"

import Frame from "../components/Frame"
import SiteScrapeConfig from "../components/SiteScrapeConfig"

const highlightStyle = `
  .amlos_highlight {
    outline: fuchsia dotted 1px !important;
    cursor: crosshair !important;
  }
`

const iframeStyle = `
  border: none;
  width: 100%;
  height: 100%;
`

const root = document.createElement("div")

let frame: HTMLIFrameElement | undefined

const injectFrame = async () => {
  if (document.contains(root)) return

  document.body.appendChild(root)

  const frameContainer = await Promise.resolve(
    renderer.render(
      <Frame>
        <iframe style={iframeStyle} />
      </Frame>,
      root
    )
  )

  frame = frameContainer.querySelector("iframe")

  let { clientHeight: height } = frame
  document.body.style.marginBottom = `${height}px`

  const styleTag = document.createElement("style")
  styleTag.textContent = highlightStyle
  document.head.appendChild(styleTag)

  populateFrame(frame)
}

/**
 * Loads the raw HTML for the frame, dups the styles and injects it into the frame,
 * and finally initializing the rendering for the frame.
 *
 * Why do we have to do this instead of something sane like setting the iframes
 * src to the html page? A few reasons:
 *
 * 1) Theres a lot of back and forth of data for getting the selectors, nodes
 * and other data out of the root document that makes communication between an iframe
 * and this content script difficult to cleanly pull off. By injecting the iframe and
 * rendering to it from the content script those issues magically disappear as the
 * code is all in the same context.
 *
 * 2) FireFox has a few bugs around styles, css links and other items injected by
 * content scripts not having CSP applied to them. It works for style attributes, but
 * that quickly gets out of hand for UI's, HOWEVER, content loaded inside of an iframe
 * that the content script injects has the correct CSP ignoring behavior, so we
 * can style an iframe with style attributes and then load the iframe with normal
 * style and link tags without issue. the only problem is that you have to recreate
 * those tags if you are injecting HTML from a server response, because of other bugs.
 *
 * Yeah, it's all sadness, but it's functional sadness.
 *
 * @param f Iframe element to load the content into
 */
const populateFrame = (f: HTMLIFrameElement) =>
  f.addEventListener(
    "load",
    async () => {
      const frameDoc = f.contentDocument

      const sidebarContentRes = await fetch(
        browser.extension.getURL("sidebar/index.html")
      )

      const sidebarContentText = await sidebarContentRes.text()

      const sidebarContent = new DOMParser().parseFromString(
        sidebarContentText,
        "text/html"
      )

      sidebarContent.querySelectorAll("style").forEach((node) => {
        const styleText = node.textContent
        node.parentNode.removeChild(node)
        node = frameDoc.createElement("style")
        node.textContent = styleText
        sidebarContent.head.appendChild(node)
      })

      sidebarContent.querySelectorAll("link").forEach((node) => {
        const newNode = frameDoc.adoptNode(node.cloneNode())
        node.parentNode.removeChild(node)
        sidebarContent.head.appendChild(newNode)
      })

      frameDoc.replaceChild(
        frameDoc.adoptNode(sidebarContent.documentElement),
        frameDoc.documentElement
      )

      renderer.render(
        <SiteScrapeConfig url={window.location.href} frame={f} />,
        frameDoc.getElementById("app-root")
      )
    },
    { once: true }
  )

browser.runtime.onMessage.addListener((message, sender) => {
  const msg = JSON.parse(message)

  console.debug(`Got message ${msg.action}`, { payload: msg.payload, sender })

  switch (msg.action) {
    case "open":
      injectFrame()
      break
  }
})
