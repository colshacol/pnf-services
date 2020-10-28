import { NowRequest, NowResponse } from "@vercel/node"
import { URLSearchParams } from "url"
import words from "random-words"
import { of } from "await-of"
import fetch from "node-fetch"
import wretch from "wretch"
import signale from "signale"
import micro from "micro-cors"
import getValue from "get-value"

// Polyfills for wretch.
global.URLSearchParams = URLSearchParams as any
global.fetch = fetch

const HEADERS = {
  "X-Recharge-Access-Token": process.env.RECHARGE_API_KEY,
  "Content-Type": "application/json",
  Accept: "application/json",
}

async function getDiscounts() {
  const url = `https://api.rechargeapps.com/discounts`
  const result = await of(wretch(url).headers(HEADERS).delete().json())
  const discounts = getValue(result[0], "discounts")

  return {
    discounts,
    error: result[1],
  }
}

async function getDiscount(code) {
  const url = `https://api.rechargeapps.com/discounts?discount_code=${code}`
  const result = await of(wretch(url).headers(HEADERS).get().json())
  const discount = getValue(result[0], "discounts.0")

  return {
    discount,
    error: result[1],
  }
}

async function deleteDiscount(id) {
  const url = `https://api.rechargeapps.com/discounts/${id}`
  const result = await of(wretch(url).headers(HEADERS).delete().json())
  return result
}

// function getDiscountWithCode(discounts, code) {
//   const url = `https://pnf-services.tasteink.com/api/getDiscounts/`
//   const result = await of(wretch(url).headers(HEADERS).delete().json())
// }

const main = async (req: NowRequest, res: NowResponse) => {
  const { code } = req.query

  console.log("DELETING DISCOUNT CODE: ", code)
  const { discount, error } = await getDiscount(code)
  console.log("DISCOUNT: ", discount)
  console.log("ERROR", error)

  if (discount) {
    const { id } = discount
    await deleteDiscount(id)
    return res.status(200).send({ success: true })
  }

  if (!discount) {
    return res.status(200).send({ success: true, message: "DOESNT_EXIST" })
  }

  return res.status(200).send({})
}

export default micro()(main)
