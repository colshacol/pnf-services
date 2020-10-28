import micro from "micro-cors"
import * as shared from "../utilities/shared"

async function all(req, res) {
  const { data, error } = await shared.getAll("customers")
  res.send({ success: true, data, error })
  console.log({ data, error })
  console.log("[done] /api/customers")
}

export default micro()(all)
