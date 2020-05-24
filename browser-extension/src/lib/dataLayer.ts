import request from "./request"

export interface IScrapeConfig {
  id: string
  url: string
  extraction_selectors: string[]
  updated_at: string
  created_at: string
}

const getForUrl = async (url: string) =>
  await request<{ scrape_config: IScrapeConfig }>(`/api/v1/site`, {
    querystring: { url },
  })

const addSelector = async (
  id: IScrapeConfig["id"],
  selector: IScrapeConfig["extraction_selectors"][0]
) =>
  await request<{ scrape_config: IScrapeConfig }>(
    `/api/v1/scrape_config/${id}/extraction`,
    {
      method: "PATCH",
      json: {
        extraction_selector: selector,
      },
    }
  )

const removeSelector = async (id: IScrapeConfig["id"], idx: number) =>
  await request<{ scrape_config: IScrapeConfig }>(
    `/api/v1/scrape_config/${id}/extraction/${idx}`,
    {
      method: "DELETE",
    }
  )

export { getForUrl, addSelector, removeSelector }
