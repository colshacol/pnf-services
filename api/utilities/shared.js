import { of } from "await-of"
import micro from "micro-cors"
import fetch from "node-fetch"
import wretch from "wretch"
global.fetch = fetch

const ARRAY_19 = Array(19).fill()

export const HEADERS = {
  "X-Recharge-Access-Token": process.env.RECHARGE_API_KEY,
  "Content-Type": "application/json",
  Accept: "application/json",
}

export function fetcherGet(url) {
  const request = wretch(url).headers(HEADERS)
  return of(request.get().json())
}

export function fetcherPost(url, data = {}) {
  const request = wretch(url).headers(HEADERS)
  return of(request.post(data).json())
}

export function fetcherDelete(url) {
  const request = wretch(url).headers(HEADERS)
  return of(request.delete())
}

export function getDiscountVariations(discountCode) {
  return ARRAY_19.map((_, index) => {
    return `${discountCode}-BOX-OF-${index + 2}`
  })
}

export async function getById(pathName, id) {
  const fullUrl = `https://api.rechargeapps.com/${pathName}/${id}`
  const [data, error] = await fetcherGet(fullUrl)
  return { data, error }
}

export async function deleteById(pathName, id) {
  const fullUrl = `https://api.rechargeapps.com/${pathName}/${id}`
  const [data, error] = await fetcherDelete(fullUrl)
  return { data, error }
}

export async function getAll(pathName) {
  const fullUrl = `https://api.rechargeapps.com/${pathName}`
  const [data, error] = await fetcherGet(fullUrl)
  return { data, error }
}
