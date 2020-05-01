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
  const res = await fetch("/api/v1/scrape_config")
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
  const scrapeConfig = {
    url: "",
    extraction_selectors: [""],
  }

  const create = async (formData: typeof scrapeConfig) =>
    fetch("/api/v1/scrape_config", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(formData),
    })

  this.addEventListener("onchange", (event) => {
    event.preventDefault()

    console.log(event)
  })

  this.addEventListener("submit", (ev) => {
    ev.preventDefault()
  })

  while (true) {
    yield (
      <form method="post">
        <fieldset>
          <label for="url">URL</label>
          <input required type="url" name="url" value={scrapeConfig.url} />
          <label for="extraction_selectors">CSS Selectors to Extract</label>
          {scrapeConfig.extraction_selectors.map((selection, idx) => (
            <input
              type="text"
              name={`extraction_selectors[${idx}]`}
              value={selection}
              crank-key={idx}
            />
          ))}
        </fieldset>

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
