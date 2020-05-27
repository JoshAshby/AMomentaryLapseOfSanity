let ele: Element
const addHighlight = (ev: MouseEvent) => {
  ele = ev.target as Element
  ele.classList.add("amlos_highlight")
}

const removeHighlight = () => {
  ele.classList.remove("amlos_highlight")
}

export { addHighlight, removeHighlight }
