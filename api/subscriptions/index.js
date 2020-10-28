import micro from "micro-cors"
import { subscriptions } from "../utilities/subscriptions"

async function all(req, res) {
  const { data, error } = await subscriptions.getAll()
  console.log("[done] /api/subscriptions")
  res.send({ success: true, data, error })
}

export default micro()(all)
