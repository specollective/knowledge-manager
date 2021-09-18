const API_MAP = {
  'knowledge-api': 'http://localhost:3333',
  'performance-api': 'http://localhost:4444'
}

export async function api (
  method,
  path,
  params = '',
  body: any = null,
  apiName = 'knowledge-api'
) {
  const host = API_MAP[apiName]
  const response = await fetch(`${host}/${path}${params}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : null
  })
  return response.json()
}
