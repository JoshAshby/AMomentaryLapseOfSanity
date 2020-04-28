/** @jsx createElement */
import { createElement, Context } from "@bikeshaving/crank"
import { renderer } from "@bikeshaving/crank/dom"

async function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration))
}

async function* LoadingIndicator() {
  await wait(1000)
  yield <div>Hang on, loading ...</div>
}

async function* ScrapeConfigs(this: Context) {
  let data: any

  const load = async () => {
    const res = await fetch("/api/v1/scrape_configs")
    data = await res.json()

    this.refresh()
  }

  await load()

  for await ({} of this) {
    yield (
      <p onclick={load}>
        There are {data.scrape_configs.length} scrape configs.
      </p>
    )
  }
}

async function* App(this: Context) {
  for await ({} of this) {
    yield <LoadingIndicator />
    yield <ScrapeConfigs />
  }
}

renderer.render(<App />, document.body)
