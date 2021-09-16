export async function api (method, path, body, params = '') {
  const response = await fetch(`http://localhost:3333/${path}${params}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : null
  })
  return response.json()
}
