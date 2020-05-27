/** @jsx createElement */
import { createElement, Context } from "@bikeshaving/crank"

import { Selection } from "../actions"

import { toggleFrame } from "../contentScripts/sidebarEntry"

function* StartSelectingButton(this: Context) {
  this.addEventListener("click", (ev) => {
    ev.preventDefault()
    ev.stopPropagation()

    toggleFrame()

    this.dispatchEvent(Selection.start({}))
  })

  while (true) {
    yield <button>Add Extraction</button>
  }
}

export default StartSelectingButton
