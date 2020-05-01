/** @jsx createElement */
import { createElement, Context, Fragment, Children } from "@bikeshaving/crank"
import { renderer } from "@bikeshaving/crank/dom"

import finder from "@medv/finder"

import Frame from "../components/Frame"

const root = document.getElementById("app-root")!
let frame: Element | undefined

// const toggleFrame = () => {
//   if (!frame) return
//   frame.dispatchEvent(new CustomEvent("frame.toggle"))
// }

// Promise.resolve(
//   renderer.render(
//     <Frame initializeOpen>
//       <ErrorBoundary>
//         <SiteScrapeConfig />
//         <Selector />
//       </ErrorBoundary>
//     </Frame>,
//     root
//   )
// )
//   .then((f) => (frame = f.firstElementChild!))
//   .then(console.log)

// document.addEventListener("frame.toggle", () => {
//   toggleFrame()
// })

// browser.runtime.onMessage.addListener((message, sender) => {
//   const msg = JSON.parse(message)

//   console.debug(`Got message ${msg.action}`, { payload: msg.payload, sender })

//   switch (msg.action) {
//   }
// })
