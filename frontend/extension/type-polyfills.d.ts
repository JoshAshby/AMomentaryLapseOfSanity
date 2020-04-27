declare module "webextension-polyfill" {
  export default browser
}

declare module "*.svg" {
  const content: Element //React.FC<React.SVGProps<SVGSVGElement>>
  export default content
}
