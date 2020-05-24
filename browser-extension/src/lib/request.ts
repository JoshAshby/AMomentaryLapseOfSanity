interface CannedRequestOpts extends RequestInit {
  querystring?: Record<string, any>
  json?: any
}

interface CannedRequest {
  <T = any>(path: string, {}: CannedRequestOpts): Promise<T>
}

const baseUrl = "http://localhost:3000/"
const request: CannedRequest = async (
  path,
  { querystring, json, body, headers, ...requestInit } = { method: "GET" }
) => {
  const url = new URL(path, baseUrl)

  if (querystring)
    Object.entries(querystring).forEach(([key, value]) =>
      url.searchParams.append(key, value)
    )

  let stringBody = body
  if (json) stringBody = JSON.stringify(json)

  const res = await fetch(url.href, {
    ...requestInit,
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: stringBody,
  })

  return res.json()
}

export default request
