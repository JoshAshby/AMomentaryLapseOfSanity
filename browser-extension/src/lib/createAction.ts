import { Context } from "@bikeshaving/crank"

/**
 * Tries to provide a semblance of typing for crank CustomEvent handlers and a
 * common way to create and publish events.
 *
 * @param type (String) Action "name" to use for the custom event type
 * @param handlerLogic Event handler for the listener
 * @param dataTransformer Transforms incoming data, the output is the input for the handlerLogic parameter
 */
function createAction<T, U = T>(
  type: string,
  handlerLogic?: (args: T, context: Context) => void,
  dataTransformer?: (args: U) => T
) {
  const dataFunc = dataTransformer || ((a: U) => (a as unknown) as T)

  const creator = (...args: Parameters<typeof dataFunc>) =>
    new CustomEvent(type, {
      bubbles: true,
      detail: { data: dataFunc(...args), creator },
    })

  creator.type = type

  function handler(this: Context, event: Event) {
    const ev = event as ReturnType<typeof creator>
    if (!ev.detail) return

    handlerLogic?.(ev.detail.data, this)
  }

  creator.handler = handler

  return creator
}

export default createAction
