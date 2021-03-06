/** @jsx createElement */
import { createElement, Children } from "@bikeshaving/crank"

function SelectorTable({ children }: { children: Children }) {
  return (
    <table style="width: 100%;">
      <thead>
        <tr>
          <th style="width: 45%;">Selector</th>
          <th style="width: 45%;"># Elements</th>
          <th style="width: 10%;"></th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  )
}

export default SelectorTable
