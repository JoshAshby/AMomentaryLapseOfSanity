/** @jsx createElement */
import { createElement, Context, Fragment, Children } from "@bikeshaving/crank"

import { css, cx } from "emotion"

/**
 * This file is a fairly similar copy, just using crankjs, of chrome-sidebar
 * from segmentio https://github.com/segmentio/chrome-sidebar and making use of
 * inline styles to prevent issues with firefox and CSP, as per
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1267027 and friends
 */

const maskClass = `
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  cursor: pointer;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.39);
  transform: translateY(100%);
  transition: transform 0.3s cubic-bezier(0, 0, 0.3, 1);
`

const maskVisibleClass = `
  transform: translateY(0%);
`

const containerClass = `
  position: fixed;
  bottom: 0px;
  right: 0px;
  width: 100%;
  height: 65%;
  max-height: 350px;
  padding: 8px;
  box-sizing: border-box;
  transform: translateY(100%);
  transition: transform .30s cubic-bezier(0, 0, 0.3, 1);
  z-index: 10000;
`

const containerVisibleClass = `
  transform: translate3d(0,0,0);
`

const containerMinimizedClass = `
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.39);
  transform: translateY(98%);
`

//   ":hover": {
//     transform: "translateY(94%)",
//   },
//   "& > iframe": {
//     pointerEvents: "none",
//   },
// })

const iframeClass = `
  border: none;
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: -1px 1px 8px rgba(0,0,0,.15);
  overflow: scroll;
`

interface FrameProps {
  children: Children
  initializeOpen: boolean
}

function* Frame(
  this: Context,
  { children, initializeOpen = false }: FrameProps
) {
  let isMinimized = !initializeOpen

  const toggle = (minimized?: boolean) => {
    if (minimized !== undefined) isMinimized = minimized
    else isMinimized = !isMinimized

    console.log({ isMinimized })

    this.refresh()
  }

  // Is this the recommended way to handle things like opening and closing from
  // an external context, in crank?
  this.addEventListener("frame.toggle", (ev) => {
    ev.preventDefault()
    ev.stopPropagation()

    toggle()
  })

  while (true) {
    yield (
      <Fragment>
        <div
          style={[maskClass, isMinimized ? "" : maskVisibleClass].join(" ")}
          onclick={() => toggle(true)}
        />
        <div
          style={[
            containerClass,
            isMinimized ? containerMinimizedClass : containerVisibleClass,
          ].join(" ")}
          onclick={() => toggle(false)}
        >
          <div style={iframeClass}>{children}</div>
        </div>
      </Fragment>
    )
  }
}

export default Frame
