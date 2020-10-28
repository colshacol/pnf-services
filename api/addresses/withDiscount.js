import micro from "micro-cors"
import { getAddresses } from "../utilities/addresses"

function logResult(data, error) {
  data.addresses && console.log(`SUCCESS: Got ${data.addresses.length} addresses.`)
  !data.addresses && console.error(`FAILURE: Got falsey addresses...`)
  error && console.error(error)
}

async function getAll(req, res) {
  const { data, error } = await getAddresses.withDiscount(req.query.discountCode)
  logResult(data, error)

  const count = data?.addresses?.length
  return res.send({ success: true, count, data, error })
}

export default micro()(getAll)
