import micro from "micro-cors"

import { getAddresses } from "../utilities/addresses"

async function checkDiscountUpdates(req, res) {
  const foundAddresses = await getAddresses.addressesWithDiscountVariation(req.query.discountCode)
  return res.send({ success: true, foundAddresses })
}

export default micro()(checkDiscountUpdates)
