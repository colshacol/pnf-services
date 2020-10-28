import micro from "micro-cors"
import { discounts } from "../utilities/discounts"

async function all(req, res) {
  const { data, error } = await discounts.getAll()
  res.send({ success: true, data, error })
  console.log({ data, error })
  console.log("[done] /api/discounts")
}

export default micro()(all)
