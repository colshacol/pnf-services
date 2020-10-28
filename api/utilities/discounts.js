import { of } from "await-of"
import curry from "just-curry-it"
import { fetcherDelete, fetcherGet, fetcherPost } from "./shared"

const getAll = async () => {
  const fullUrl = "https://api.rechargeapps.com/discounts"
  const [data, error] = await fetcherGet(fullUrl)
  return { data, error }
}

const getById = async (discountId) => {
  const fullUrl = `https://api.rechargeapps.com/discounts/${discountId}`
  const [data, error] = await fetcherGet(fullUrl)
  return { data, error }
}

const deleteById = async (discountId) => {
  const fullUrl = `https://api.rechargeapps.com/discounts/${discountId}`
  const [data, error] = await fetcherDelete(fullUrl)
  return { data, error }
}

export const discounts = {
  getAll,
  getById,
  deleteById,
}
