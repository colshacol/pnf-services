// import nanoid from "nanoid"
// import FormData from "form-data"
import { NowRequest, NowResponse } from "@vercel/node"
import { URLSearchParams } from "url"
import words from "random-words"
import { of } from "await-of"
import fetch from "node-fetch"
import wretch from "wretch"
import signale from "signale"
import micro from "micro-cors"
import getValue from "get-value"

const HEADERS = {
  "X-Recharge-Access-Token": process.env.RECHARGE_API_KEY,
  "Content-Type": "application/json",
  Accept: "application/json",
}

// Polyfills for wretch.
global.URLSearchParams = URLSearchParams as any
global.fetch = fetch

const createLogger = (cache = []) => {
  const log = (identifier, data) => {
    console.log({ identifier, data })
    cache.push({ identifier, data })
  }

  log.dump = () => cache
  return log
}

const main = async (req, res) => {
  const log = createLogger()
  log("STARTING", req.query)
  const itemCount = req.query.itemCount
  const totalPrice = req.query.totalPrice
  const discountCode = req.query.discountCode.toUpperCase()
  const eligibleDiscountsCount = itemCount - 1
  const quantityDiscountCode = `BOX-OF-${itemCount}`
  const savingsFromQuantity = eligibleDiscountsCount * 20
  const priceAfterQuantityDiscount = totalPrice - savingsFromQuantity
  const [code, count] = [quantityDiscountCode, eligibleDiscountsCount]

  const done = (status, options) => {
    const logs = status === 200 ? undefined : log.dump()
    res.status(status).send({ ...options, logs })
  }

  const logApi = (thunk) => async (...args) => {
    const result = await thunk(...args)
    log(thunk.name, JSON.stringify({ args, result }, null, 2))
    return result
  }

  const recharge = (() => {
    async function getDiscount(code) {
      const url = "https://api.rechargeapps.com/discounts?discount_code=" + code
      const result = await of(wretch(url).headers(HEADERS).get().json())
      const discount = getValue(result[0], "discounts.0")
      console.log("GOT DISCOUNT", result)
      return [discount, result[1]]
    }

    async function getAllDiscounts() {
      const url = "https://api.rechargeapps.com/discounts?limit=250"
      const result = await of(wretch(url).headers(HEADERS).get().json())
      const discounts = getValue(result[0], "discounts") || []
      return [discounts, result[1]]
    }

    async function createDiscount(candidate) {
      const url = "https://api.rechargeapps.com/discounts"
      // const result = await of(fetch(url, { headers }).then((res) => res.json()))
      const result = await of(wretch(url).headers(HEADERS).post(candidate).json())
      const discount = result[0] && result[0].discount
      console.log("---", result[0], result[1])
      return [discount, result[1]]
    }

    async function createQuantityDiscount(code, count) {
      return recharge.createDiscount({
        code,
        value: count * 20,
        discount_type: "fixed_amount",
        duration: "forever",
      })
    }

    return {
      getDiscount: logApi(getDiscount),
      getAllDiscounts: logApi(getAllDiscounts),
      createDiscount: logApi(createDiscount),
      createQuantityDiscount: logApi(createQuantityDiscount),
    }
  })()

  let isDone = false

  let [promotionDiscount, promotionDiscountError] = await recharge.getDiscount(discountCode)
  console.log("\n\n\nGET PROMOTION DISCOUNT", { promotionDiscount, promotionDiscountError })

  if (!promotionDiscount) {
    console.log("\n\nINVALID PROMOTION DISCOUNT CODE\n\n")
    done(200, { message: "INVALID_CODE", type: "warning" })
    isDone = true
  }

  let [quantityDiscount, quantityDiscountError] = await recharge.getDiscount(quantityDiscountCode)
  console.log("\n\n\nGET QUANTITY DISCOUNT", { quantityDiscount, quantityDiscountError })

  if (!quantityDiscount) {
    ;[quantityDiscount, quantityDiscountError] = await recharge.createQuantityDiscount(code, count)
    console.log("\n\n\nCREATE QUANTITY DISCOUNT", { quantityDiscount, quantityDiscountError })
  }

  if (!isDone) {
    const [newDiscount, newDiscountError] = await recharge.createDiscount({
      code: `${promotionDiscount.code}-${quantityDiscountCode}`,
      value: `${promotionDiscount.value + savingsFromQuantity}`,
      discount_type: promotionDiscount.discount_type || "fixed_amount",
      duration: "forever",
    })

    return newDiscountError
      ? done(200, { message: "CANT_CREATE_HYBRID_DISCOUNT", type: "error", error: newDiscountError })
      : done(200, { message: "SUCCESS", type: "success", newDiscount })
  }
}

export default micro()(main)
