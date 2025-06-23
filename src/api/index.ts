const BASE_URL: string = import.meta.env.VITE_API_BASE
console.log('BASE_URL', BASE_URL)
console.log('import.meta.env', import.meta.env)
const api = {
  get: async (url: string) => {
    try {
      const response = await fetch(`${BASE_URL}${url}`)
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }
      const json = await response.json()
      return json
    } catch (error) {
      console.error(error?.message)
    }
  },
  post: async (url: string, body: BodyInit) => {
    try {
      const response = await fetch(`${BASE_URL}/${url}`, {
        body,
        method: 'POST',
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
}

export default api
