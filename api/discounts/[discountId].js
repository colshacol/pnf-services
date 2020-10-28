import micro from "micro-cors"
import { discounts } from "../utilities/discounts"

async function getById(req, res) {
  const discountId = Number(req.query.discountId)
  const { data, error } = await discounts.getById(discountId)
  return res.send({ success: true, discountId, data, error })
}

export default micro()(getById)
