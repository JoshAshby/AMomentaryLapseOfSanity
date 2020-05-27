/** @jsx createElement */
import { createElement, Context, Children } from "@bikeshaving/crank"

interface FrameProps {
  children: Children
}

function* Frame(this: Context, { children }: FrameProps) {
  while (true) {
    yield <div class="amlos_iframe-container">{children}</div>
  }
}

export default Frame
