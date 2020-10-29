import micro from "micro-cors"
import * as shared from "../utilities/shared"

export default shared.rechargeAllHandler({
  serviceName: "/api/discounts",
  rechargeType: "discounts",
})
