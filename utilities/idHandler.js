import { getById } from "./shared"
import { createHtml } from "./createHtml"
import { handleTable } from "./handleTable"

export function idHandler(options) {
  const logger = (method) => (...args) => console.log(`${options.serviceName} |`, ...args)
  const logErr = logger("error")
  const log = logger("log")

  return async (req, res) => {
    log("GOT REQUEST")

    const { data, error } = await getById(options.rechargeType, req.query.id)
    const innerData = [data[options.rechargeType]]
    const query = req.query || {}

    error && logErr("GOT ERROR", error)
    data && log("GOT DATA WITH PROPERTIES: ", Object.keys(data))
    log(`DONE WITH REQUEST`)

    if (innerData && query.csv) {
      return handleTable(req, res)(innerData, options)
    }

    res.send({
      success: true,
      ...options,
      error,
      request: {
        url: req.url,
        query: req.query,
        body: req.body,
      },

      [options.rechargeType]: innerData,
    })
  }
}
