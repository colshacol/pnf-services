import micro from "micro-cors"

import { getAddresses } from "../utilities/addresses"

async function removeDiscount(req, res) {
  const { data, error } = await getAddresses.removeDiscount(req.query.addressId)
  console.log("removeDiscount - complete")

  return res.send({ success: true, data, error })
}

export default micro()(removeDiscount)
