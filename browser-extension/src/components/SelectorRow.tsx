/** @jsx createElement */
import { createElement, Children } from "@bikeshaving/crank"

function SelectorRow({
  selector,
  nodes,
  children,
  ...props
}: {
  selector: string
  nodes: NodeListOf<Element>
  children?: Children
}) {
  return (
    <tr {...props}>
      <td>{selector}</td>
      <td>{nodes.length}</td>
      <td>{children}</td>
    </tr>
  )
}

export default SelectorRow
