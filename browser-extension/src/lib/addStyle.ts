const addStyle = (style: string) => {
  const styleTag = document.createElement("style")
  styleTag.textContent = style
  document.head.appendChild(styleTag)
}

export default addStyle
