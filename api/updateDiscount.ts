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

const main = async (req: NowRequest, res) => {
  const { id, ...data } = req.method === "GET" ? req.query : req.body
  const forwardUrl = "https://api.rechargeapps.com/discounts/" + id
  const result = await of(wretch(forwardUrl).headers(HEADERS).post(data).json())
  const discount = result[0] && result[0].discount
  return res.status(200).send({ discount, error: result[1], data })
}

export default micro()(main)
