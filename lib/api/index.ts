import { envs } from '@/utils/envs'
import { tokenSchema } from '@/utils/schemas'
import { readFromStore, saveToStore, StoreKeys } from '@/utils/secure-store'
import axios from 'axios'

export async function initApi() {
  const accessToken = await readFromStore(StoreKeys.ACCESS_TOKEN)

  if (accessToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
  }

  axios.defaults.baseURL = envs.API_BASE_URL
}

export async function tryRefreshToken() {
  try {
    const res = await fetch(envs.TOKEN_URL, {
      headers: {
        'Content-Type': 'application/json',
        [envs.HEADER_KEY]: envs.HEADER_VALUE
      }
    })

    if (!res.ok) {
      throw new Error('Failed to fetch new token token')
    }

    const json = await res.json()
    const parsedToken = tokenSchema.safeParse(json)

    if (!parsedToken.success) {
      throw new Error('Unexpected token format')
    }

    await saveToStore(
      StoreKeys.ACCESS_TOKEN,
      JSON.stringify(parsedToken.data.access_token)
    )

    axios.defaults.headers.common['Authorization'] =
      `Bearer ${parsedToken.data.access_token}`
  } catch (e) {
    console.error(e)
  }
}
