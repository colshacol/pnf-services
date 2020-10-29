import { of } from "await-of"
import curry from "just-curry-it"
import { fetcherGet, fetcherPost, getDiscountVariations, HEADERS } from "./shared"

const all = async () => {
  const fullUrl = "https://api.rechargeapps.com/addresses"
  const [data, error] = await fetcherGet(fullUrl)
  return { data, error }
}

const byId = async (addressId) => {
  const fullUrl = `https://api.rechargeapps.com/addresses/${addressId}`
  const [data, error] = await fetcherGet(fullUrl)
  return { data, error }
}

const countWithDiscount = async (discountCode) => {
  const baseUrl = "https://api.rechargeapps.com/addresses/count"
  const urlQuery = `?discount_code=${discountCode}`
  const fullUrl = `${baseUrl}${urlQuery}`
  const [data, error] = await fetcherGet(fullUrl)
  return { data, error }
}

const withDiscount = async (discountCode) => {
  const baseUrl = "https://api.rechargeapps.com/addresses"
  const urlQuery = `?discount_code=${discountCode}`
  const fullUrl = `${baseUrl}${urlQuery}`
  const [data, error] = await fetcherGet(fullUrl)
  return { data, error }
}

const removeDiscount = async (addressId) => {
  const fullUrl = `https://api.rechargeapps.com/addresses/${addressId}/remove_discount`
  const [data, error] = await fetcherPost(fullUrl)
  return { data, error }
}

const applyDiscount = async (addressId, discount_code) => {
  const fullUrl = `https://api.rechargeapps.com/addresses/${addressId}/apply_discount`
  const [data, error] = await fetcherPost(fullUrl, HEADERS, { discount_code })
  return { data, error }
}

// Given discountCode = "FOO"
// Get all addresses using "FOO-BOX-OF-2",
// Get all addresses using "FOO-BOX-OF-3",
// (Repeat until "FOO-BOX-OF-20" is reached.)
// Combine all addresses into a single list.
// For each address in the list,
// Determine the new discountCode for the address
//   by removing "FOO-" from the existing discountCode.
// Remove the existing discountCode.
// Then apply the new discountCode.

const addressesWithDiscountVariation = async (discountCode) => {
  const discountVariations = getDiscountVariations(discountCode)
  const addressIdsToUpdate = []

  const recordAddressData = (currentDiscountCode) => ({ id: addressId }) => {
    const newDiscountCode = currentDiscountCode.replace(`${discountCode}-`, "")
    addressIdsToUpdate.push({ addressId, currentDiscountCode, newDiscountCode })
  }

  const promises = discountVariations.map(async (discountCode) => {
    const { data, error } = await getAddresses.withDiscount(discountCode)
    error && console.log(JSON.parse(error.message))
    error && console.log(`ERROR getting addresses for discount ${discountCode}`)
    data?.addresses.map(recordAddressData(discountCode))
  })

  await Promise.all(promises)
  return addressIdsToUpdate
}

export const getAddresses = {
  all,
  byId,
  applyDiscount,
  withDiscount,
  countWithDiscount,
  removeDiscount,
  addressesWithDiscountVariation,
}

/*

  Given discountCode "EXAMPLE",
  for each -BOX-OF-X discountCode variation,
  find all addresses using the discountCode variation.
  For each address found,
  remove the current discountCode,
  apply the normal BOX-OF-X discountCode.

*/
