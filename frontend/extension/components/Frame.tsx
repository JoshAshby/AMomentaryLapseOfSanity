/** @jsx createElement */
import {
  createElement,
  Context,
  Fragment,
  Element,
  Children,
} from "@bikeshaving/crank"

import { css, cx } from "emotion"

/**
 * This file is a fairly similar copy, just using crankjs, of chrome-sidebar
 * from segmentio https://github.com/segmentio/chrome-sidebar
 */

const maskClass = css`
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

const maskVisibleClass = css({
  // display: "block",
  transform: "translateY(0%)",
})

const containerClass = css({
  position: "fixed",
  bottom: "0px",
  right: "0px",
  width: "100%",
  height: "65%",
  maxHeight: "350px",
  padding: "8px",
  boxSizing: "border-box",
  transform: "translateY(100%)",
  transition: "transform .30s cubic-bezier(0, 0, 0.3, 1)",
  zIndex: 10000,
})

const containerVisibleClass = css({
  transform: "translate3d(0,0,0)",
})

const containerMinimizedClass = css({
  cursor: "pointer",
  backgroundColor: "rgba(0, 0, 0, 0.39)",
  transform: "translateY(98%)",
  ":hover": {
    transform: "translateY(94%)",
  },
  "& > iframe": {
    pointerEvents: "none",
  },
})

const iframeClass = css({
  border: "none",
  width: "100%",
  height: "100%",
  background: "white",
  borderRadius: "8px",
  boxShadow: "-1px 1px 8px rgba(0,0,0,.15)",
})

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
  this.addEventListener("frame.toggle", () => toggle())

  while (true) {
    yield (
      <Fragment>
        <div
          className={cx({
            [maskClass]: true,
            [maskVisibleClass]: !isMinimized,
          })}
          onclick={() => toggle(true)}
        />
        <div
          className={cx({
            [containerClass]: true,
            [containerVisibleClass]: true,
            [containerMinimizedClass]: isMinimized,
          })}
          onclick={() => toggle(false)}
        >
          <div
            className={cx({
              [iframeClass]: true,
            })}
          >
            {children}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Frame
