import micro from "micro-cors"
import * as shared from "../utilities/shared"

export default micro()(
  shared.rechargeAllHandler({
    serviceName: "/api/customers",
    rechargeType: "customers",
  })
)
