import micro from "micro-cors"
import { getAddresses } from "../utilities/addresses"

const parseJSON = (target) => {
  if (typeof target !== "string") return target

  try {
    return JSON.parse(target)
  } catch (error) {
    return target
  }
}

async function updateDiscounts(req, res) {
  const foundAddresses = await getAddresses.addressesWithDiscountVariation(req.query.discountCode)
  const logs = []

  // const target = foundAddresses.slice(0, 1)
  for (const { addressId, currentDiscountCode, newDiscountCode } of foundAddresses) {
    console.log("handling: ", { addressId, currentDiscountCode, newDiscountCode })

    {
      const { data = null, error = null } = await getAddresses.removeDiscount(addressId)
      !error && console.log("removed discount from ", addressId)
      !error && logs.push("removed discount from " + addressId)
      !error && logs.push({ error, data })
      error && console.log(error)
    }

    {
      const { data = null, error = null } = await getAddresses.applyDiscount(addressId, newDiscountCode)
      !error && console.log("applied discount to ", addressId)
      !error && logs.push("applied discount to " + addressId)
      !error && logs.push({ error, data })
      error && console.log(error)
    }
  }

  return res.send({
    success: true,
    query: req.query,
    foundAddresses,
    logs,
  })
}

export default micro()(updateDiscounts)
