import micro from "micro-cors"
import { subscriptions } from "../utilities/subscriptions"

async function getById(req, res) {
  const subscriptionId = Number(req.query.subscriptionId)
  const { data, error } = await subscriptions.getById(subscriptionId)
  return res.send({ success: true, subscriptionId, data, error })
}

export default micro()(getById)
