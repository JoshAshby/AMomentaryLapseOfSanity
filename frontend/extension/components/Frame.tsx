/** @jsx createElement */
import { createElement, Context, Fragment } from "@bikeshaving/crank"

/**
 * This file is a fairly similar copy, just using crankjs, of chrome-sidebar
 * from segmentio https://github.com/segmentio/chrome-sidebar
 */

import classnames from "classnames"
import { css } from "glamor"

const maskClass = css({
  // display: "none",
  position: "fixed",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  cursor: "pointer",
  zIndex: "9999",
  backgroundColor: "rgba(0, 0, 0, 0.39)",
  transform: "translateY(100%)",
  transition: "transform .30s cubic-bezier(0, 0, 0.3, 1)",
})

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
  url: string
}

function* Frame(this: Context, { url }: FrameProps) {
  let isMinimized = false

  const toggle = () => {
    isMinimized = !isMinimized
    console.log({ isMinimized })
    this.refresh()
  }

  // Is this the recommended way to handle things like opening and closing from
  // an external context, in crank?
  this.addEventListener("frame.toggle", toggle)

  while (true) {
    yield (
      <Fragment>
        <div
          className={classnames({
            [maskClass.toString()]: true,
            [maskVisibleClass.toString()]: !isMinimized,
          })}
          onclick={toggle}
        />
        <div
          className={classnames({
            [containerClass.toString()]: true,
            [containerVisibleClass.toString()]: true,
            [containerMinimizedClass.toString()]: isMinimized,
          })}
          onclick={toggle}
        >
          <iframe
            className={classnames({
              [iframeClass.toString()]: true,
            })}
            src={url}
          />
        </div>
      </Fragment>
    )
  }
}

export default Frame
