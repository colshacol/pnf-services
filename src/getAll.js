import micro from "micro-cors"
import { allHandler } from "../utilities/allHandler"

export default micro()((req, res) => {
  console.log("GET ALL REQUEST: ", req.query.dataSet)
  const getter = getters[req.query.dataSet]
  return getter(req, res)
})

const getters = {
  discounts: allHandler({
    serviceName: "discounts-api",
    rechargeType: "discounts",
  }),

  addresses: allHandler({
    serviceName: "addresses-api",
    rechargeType: "addresses",
  }),

  subscriptions: allHandler({
    serviceName: "subscriptions-api",
    rechargeType: "subscriptions",
  }),

  customers: allHandler({
    serviceName: "customers-api",
    rechargeType: "customers",
  }),
}
