const toggleFrame = () =>
  JSON.stringify({
    action: "toggle-frame",
  })

toggleFrame.type = "toggle-frame"

const Messages = {
  toggleFrame,
}

export default Messages
