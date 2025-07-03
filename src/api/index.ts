const BASE_URL: string = import.meta.env.VITE_API_BASE
console.log('BASE_URL', BASE_URL)
console.log('import.meta.env', import.meta.env)

function checkCookie() {
  const cookieStart = document.cookie.indexOf('access_token=') + 13
  const cookieEnd =
    document.cookie.indexOf(';', cookieStart) !== -1
      ? document.cookie.indexOf(';', cookieStart)
      : document.cookie.length

  return document.cookie.indexOf('access_token=') !== -1
    ? document.cookie?.substring(cookieStart, cookieEnd)
    : null
}

const max_age_seconds = 31 * 24 * 60 * 60

const token = ''
// if (!token) {
//   token = checkCookie()
// }

// document.cookie = `access_token=${token}; path=/; max-age=${max_age_seconds};`
const api = {
  get: async (url: string, signal?: AbortSignal) => {
    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        credentials: 'include',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        signal,
      })
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }
      const json = await response.json()
      return json
    } catch (error) {
      console.error(error?.message)
    }
  },
  post: async (url: string, body: BodyInit | object = {}, signal?: AbortSignal) => {
    console.log('body', typeof body, body)
    // const typeOfContent = typeof body === 'string' ? 'application/json' : null
    const isObjectType = body instanceof FormData ? null : 'application/json'
    console.log('isObjectType', isObjectType)
    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        credentials: 'include',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
          ...(isObjectType && { 'Content-Type': isObjectType }), // Важно!
        },
        body: isObjectType ? JSON.stringify(body) : body,
        method: 'POST',
        signal,
      })
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }
      const json = await response?.json()
      return json
    } catch (error) {
      console.error(error?.message)
    }
  },
}

export default api
