import micro from "micro-cors"
import { getAddresses } from "../utilities/addresses"

async function all(req, res) {
  const { data, error } = await getAddresses.all()
  return res.send({ success: true, data, error })
}

export default micro()(all)
