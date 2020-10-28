import micro from "micro-cors"
import * as shared from "../utilities/shared"

async function deleteById(req, res) {
  const discountId = Number(req.query.discountId)
  const { data, error } = await shared.deleteById(discountId)
  return res.send({ success: true, discountId, data, error })
}

export default micro()(deleteById)
