/** @jsx createElement */
import { createElement, Context, Fragment, Children } from "@bikeshaving/crank"

const containerStyle = `
  position: fixed;
  bottom: 0px;
  right: 0px;
  width: 100%;
  height: 65%;
  max-height: 350px;
  box-sizing: border-box;
  z-index: 10000;
`

interface FrameProps {
  children: Children
}

function* Frame(this: Context, { children }: FrameProps) {
  while (true) {
    yield <div style={containerStyle}>{children}</div>
  }
}

export default Frame
