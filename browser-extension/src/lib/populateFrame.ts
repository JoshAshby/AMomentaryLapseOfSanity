/**
 * Loads an HTML Document info an iframe; duping styles and link tags to ensure
 * CSP issues are resolved.
 *
 * Why do we have to do this instead of something sane like setting the iframes
 * src to the html page? A few reasons:
 *
 * 1) Theres a lot of back and forth of data for getting the selectors, nodes
 * and other data out of the root document that makes communication between an iframe
 * and this content script difficult to cleanly pull off. By injecting the iframe and
 * rendering to it from the content script those issues magically disappear as the
 * code is all in the same context.
 *
 * 2) FireFox has a few bugs around styles, css links and other items injected by
 * content scripts not having CSP applied to them. It works for style attributes, but
 * that quickly gets out of hand for UI's, HOWEVER, content loaded inside of an iframe
 * that the content script injects has the correct CSP ignoring behavior, so we
 * can style an iframe with style attributes and then load the iframe with normal
 * style and link tags without issue. the only problem is that you have to recreate
 * those tags if you are injecting HTML from a server response, because of other bugs.
 *
 * Yeah, it's all sadness, but it's functional sadness.
 *
 * @param f Iframe element to load the content into
 * @param content Document to load
 *
 * @returns Promise resolves to the newly injected document inside the Iframe
 */
const populateFrame = async (
  f: HTMLIFrameElement,
  content: Document
): Promise<Document> =>
  new Promise((resolve) =>
    f.addEventListener(
      "load",
      async () => {
        const frameDoc = f.contentDocument

        content.querySelectorAll("style").forEach((node) => {
          const styleText = node.textContent
          node.parentNode.removeChild(node)
          node = frameDoc.createElement("style")
          node.textContent = styleText
          content.head.appendChild(node)
        })

        content.querySelectorAll("link").forEach((node) => {
          const newNode = frameDoc.adoptNode(node.cloneNode())
          node.parentNode.removeChild(node)
          content.head.appendChild(newNode)
        })

        frameDoc.replaceChild(
          frameDoc.adoptNode(content.documentElement),
          frameDoc.documentElement
        )

        resolve(frameDoc)
      },
      { once: true }
    )
  )

export default populateFrame
