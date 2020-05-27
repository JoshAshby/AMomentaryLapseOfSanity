import browser from "webextension-polyfill"

import Messages from "../Messages"

browser.runtime.onInstalled.addListener(({ reason }) => {
  console.debug("Loaded extension", { reason })
})

browser.browserAction.onClicked.addListener((tab) => {
  if (!tab.id || tab.id == browser.tabs.TAB_ID_NONE) return

  console.debug("Browser action triggered, toggling frame", tab)

  const msg = Messages.toggleFrame()
  browser.tabs.sendMessage(tab.id, msg)
})
