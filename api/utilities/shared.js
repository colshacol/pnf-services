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

export async function getAll(rechargeType) {
  const fullUrl = `https://api.rechargeapps.com/${rechargeType}`
  const [data, error] = await fetcherGet(fullUrl)
  return { data, error }
}

export function rechargeAllHandler(options) {
  const logger = (method) => (...args) => console.log(`${options.serviceName} | `, ...args)
  const logErr = logger("error")
  const log = logger("log")

  return async (req, res) => {
    log("GOT REQUEST")
    const { data, error } = await getAll(options.rechargeType)
    const innerData = data?.[options.rechargeType]
    const query = req.query || {}

    error && logErr("GOT ERROR", error)
    data && log("GOT DATA WITH PROPERTIES: ", Object.keys(data))
    log(`DONE WITH REQUEST`)

    if (innerData && query.csv) {
      const entries = Object.entries(innerData[0])

      const headers = entries.reduce((final, [key, value]) => {
        if (typeof value !== "object") final.push(key)
        return final
      }, [])

      const html = createHtml(headers, innerData, options.serviceName)
      return res.send(html)
    }

    res.send({
      success: true,
      ...options,
      error,
      request: {
        url: req.url,
        query: req.query,
        body: req.body,
      },

      [options.rechargeType]: innerData,
    })
  }
}
