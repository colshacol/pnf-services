import micro from "micro-cors"
import * as shared from "../utilities/shared"

async function getById(req, res) {
  const customerId = Number(req.query.customerId)
  const { data, error } = await shared.getById("customers", customerId)
  return res.send({ success: true, customerId, data, error })
}

export default micro()(getById)
