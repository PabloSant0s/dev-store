import { env } from '@/env'

export function api(path: string, init?: RequestInit) {
  const baseUrl = env!.NEXT_PUBLIC_API_BASE_URL
  const apiKey = '/api'
  const url = new URL(apiKey.concat(path), baseUrl)
  console.log(url)

  return fetch(url, init)
}
