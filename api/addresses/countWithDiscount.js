import micro from "micro-cors"

import { getAddresses } from "../utilities/addresses"

function logResult(data, error) {
  !error && console.log(`count: ${data.count}`)
  error && console.error(error)
}

async function countWithDiscount(req, res) {
  const { data, error } = await getAddresses.countWithDiscount(req.query.discountCode)
  logResult(data, error)

  return res.send({ success: true, data, error })
}

export default micro()(countWithDiscount)
