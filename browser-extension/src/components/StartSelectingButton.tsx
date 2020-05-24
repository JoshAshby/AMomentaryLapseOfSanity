/** @jsx createElement */
import { createElement, Context } from "@bikeshaving/crank"

import { Selection } from "../actions"

function* StartSelectingButton(this: Context) {
  this.addEventListener("click", (ev) => {
    ev.preventDefault()
    ev.stopPropagation()

    this.dispatchEvent(Selection.start({}))
  })

  while (true) {
    yield <button>Add Extraction</button>
  }
}

export default StartSelectingButton
