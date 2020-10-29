import micro from "micro-cors"
import { idHandler } from "../utilities/idHandler"

export default micro()((req, res) => {
  console.log("GET BY ID REQUEST: ", req.query)
  const getter = getters[req.query.dataSet]
  return getter(req, res)
})

const getters = {
  discounts: idHandler({
    serviceName: "discounts-api",
    rechargeType: "discount",
  }),

  addresses: idHandler({
    serviceName: "addresses-api",
    rechargeType: "addresse",
  }),

  subscriptions: idHandler({
    serviceName: "subscriptions-api",
    rechargeType: "subscription",
  }),

  customers: idHandler({
    serviceName: "customers-api",
    rechargeType: "customer",
  }),
}
