/** @jsx createElement */
import { createElement, Children } from "@bikeshaving/crank"

function SelectorRow({
  selector,
  node,
  children,
  ...props
}: {
  selector: string
  node: HTMLElement
  children?: Children
}) {
  return (
    <tr {...props}>
      <td>{selector}</td>
      <td>{node.innerText.substring(0, 80)}</td>
      <td>{children}</td>
    </tr>
  )
}

export default SelectorRow
