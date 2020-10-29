import { of } from "await-of"
import fetch from "node-fetch"
import wretch from "wretch"
import { createHtml } from "./createHtml"
global.fetch = fetch

const ARRAY_19 = Array(19).fill()

export const HEADERS = {
  "X-Recharge-Access-Token": process.env.RECHARGE_API_KEY,
  "Content-Type": "application/json",
  Accept: "application/json",
}

console.log(HEADERS)

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
  const fullUrl = `https://api.rechargeapps.com/${pathName}s/${id}`
  const [data = {}, error] = await fetcherGet(fullUrl)
  return { data, error }
}

export async function deleteById(pathName, id) {
  const fullUrl = `https://api.rechargeapps.com/${pathName}/${id}`
  const [data, error] = await fetcherDelete(fullUrl)
  return { data, error }
}

export async function getAll(rechargeType) {
  const fullUrl = `https://api.rechargeapps.com/${rechargeType}`
  const [data, error] = await fetcherGet(fullUrl)
  return { data, error }
}
