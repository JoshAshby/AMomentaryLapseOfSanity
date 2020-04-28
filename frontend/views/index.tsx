/** @jsx createElement */
import { createElement, Context, Fragment } from "@bikeshaving/crank"
import { renderer } from "@bikeshaving/crank/dom"

async function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration))
}

async function* LoadingIndicator() {
  await wait(1000)
  yield <div>Hang on, loading ...</div>
}

async function ScrapeConfigTable(this: Context) {
  const res = await fetch("/api/v1/scrape_configs")
  const data = await res.json()

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>URL</th>
          <th># Extractions</th>
        </tr>
      </thead>
      <tbody>
        {data.scrape_configs.map((scrape_config: any, idx: number) => (
          <tr crank-key={idx}>
            <td>{scrape_config.id}</td>
            <td>{scrape_config.url}</td>
            <td>{scrape_config.extraction_selectors.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

interface FormDataEvent extends Event {
  readonly formData: FormData
}

interface FormDataEventInit extends EventInit {
  formData: FormData
}

declare var FormDataEvent: {
  prototype: FormDataEvent
  new (type: string, eventInitDict?: FormDataEventInit): FormDataEvent
}

function* ScrapeConfigForm(this: Context) {
  this.addEventListener("submit", (event) => {
    event.preventDefault()

    const target = event.target as HTMLFormElement
    new FormData(target)

    target.reset()
  })

  this.addEventListener("formdata", (event) => {
    const { formData } = event as FormDataEvent

    const scrape_config: any = {
      url: formData.get("url"),
      extraction_selectors: formData
        .get("extraction_selectors")
        ?.toString()
        .split(",")
        .map((s) => s.trim()),
    }

    fetch("/api/v1/scrape_configs", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(scrape_config),
    })
  })

  while (true) {
    yield (
      <form>
        <input required type="url" name="url" />
        <input type="text" name="extraction_selectors" />

        <input type="submit" />
      </form>
    )
  }
}

function ScrapeConfigs() {
  return (
    <Fragment>
      <ScrapeConfigForm />
      <ScrapeConfigTable />
    </Fragment>
  )
}

async function* App(this: Context) {
  for await ({} of this) {
    yield <LoadingIndicator />
    yield <ScrapeConfigs />
  }
}

const root = document.getElementById("app-root") as Element
renderer.render(<App />, root)
