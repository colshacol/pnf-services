import micro from "micro-cors"
import { discounts } from "../utilities/discounts"

async function deleteById(req, res) {
  const discountId = Number(req.query.discountId)
  const { data, error } = await discounts.deleteById(discountId)
  return res.send({ success: true, discountId, data, error })
}

export default micro()(deleteById)
