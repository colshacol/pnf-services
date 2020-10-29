import micro from "micro-cors"
import { getAddresses } from "../utilities/addresses"

async function getByAddressId(req, res) {
  const addressId = Number(req.query.addressId)
  const { data, error } = await getAddresses.byId(addressId)
  return res.send({ success: true, addressId, data, error })
}

export default micro()(getByAddressId)
