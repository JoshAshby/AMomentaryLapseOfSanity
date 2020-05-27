import finder from "@medv/finder"

const defaultIgnoreTags = ["HTML", "BODY"]

const findSelectors = (
  nodes: NodeListOf<Element>,
  {
    ignoreElements,
    ignoreTags = defaultIgnoreTags,
  }: {
    ignoreElements: Element[]
    ignoreTags?: string[]
  } = {
    ignoreElements: [],
    ignoreTags: defaultIgnoreTags,
  }
) =>
  Array.from(nodes)
    .filter(
      (node) =>
        !ignoreElements.some((inode) => node.contains(inode)) &&
        !ignoreTags.includes(node.nodeName)
    )
    .reverse()
    .reduce(
      (memo, node) => ({
        ...memo,
        [finder(node, {
          className: (name) => !name.startsWith("amlos_"),
          seedMinLength: 4,
        })]: node,
      }),
      {}
    )

export default findSelectors
