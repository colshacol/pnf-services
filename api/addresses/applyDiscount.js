import micro from "micro-cors"

import { getAddresses } from "../utilities/addresses"

async function applyDiscount(req, res) {
  const addressId = Number(req.query.addressId)
  const discountCode = req.query.discountCode
  const query = { addressId, discountCode }
  const { data, error } = await getAddresses.applyDiscount(addressId, discountCode)
  console.log("applyDiscount - complete")

  return res.send({ success: true, data, error, query })
}

export default micro()(applyDiscount)
