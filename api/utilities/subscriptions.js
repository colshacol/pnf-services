import { of } from "await-of"
import curry from "just-curry-it"
import { fetcherGet, fetcherPost } from "./shared"

const getAll = async () => {
  const fullUrl = "https://api.rechargeapps.com/subscriptions"
  const [data, error] = await fetcherGet(fullUrl)
  return { data, error }
}

const getById = async (subscriptionId) => {
  const fullUrl = `https://api.rechargeapps.com/subscriptions/${subscriptionId}`
  const [data, error] = await fetcherGet(fullUrl)
  return { data, error }
}

export const subscriptions = {
  getAll,
  getById,
}
