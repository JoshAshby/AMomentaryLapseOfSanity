import browser from "webextension-polyfill"

const root = document.createElement("iframe")
root.src = browser.extension.getURL("sidebar/index.html")
root.style.cssText = `
  background: transparent none repeat scroll 0% 0% !important;
  border: 0px none !important;
  border-radius: 0px !important;
  box-shadow: none !important;
  display: block !important;
  height: 100% !important;
  left: 0px !important;
  margin: 0px !important;
  max-height: none !important;
  max-width: none !important;
  opacity: 1 !important;
  outline: currentcolor none 0px !important;
  padding: 0px !important;
  position: fixed !important;
  top: 0px !important;
  visibility: visible !important;
  width: 100% !important;
  z-index: 2147483647 !important;
  pointer-events: auto !important;
`

const toggleFrame = () => {
  if (document.contains(root)) {
    root.contentDocument!.body.dispatchEvent(
      new CustomEvent("frame.toggle", { bubbles: true })
    )

    return
  }

  document.body.appendChild(root)

  root.addEventListener(
    "load",
    () => {
      root.contentDocument!.body.dispatchEvent(
        new CustomEvent("frame.toggle", {
          bubbles: true,
        })
      )
    },
    { once: true }
  )
}

browser.runtime.onMessage.addListener((message, sender) => {
  const msg = JSON.parse(message)

  console.debug(`Got message ${msg.action}`, { payload: msg.payload, sender })

  switch (msg.action) {
    case "open":
      toggleFrame()
      break
  }
})
