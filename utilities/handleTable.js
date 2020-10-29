import { createHtml } from "./createHtml"

export function handleTable(req, res) {
  return (data, options) => {
    console.log({ data })
    const entries = Object.entries(data[0])

    const headers = entries.reduce((final, [key, value]) => {
      if (typeof value !== "object") final.push(key)
      return final
    }, [])

    const html = createHtml(headers, data, options.serviceName)
    return res.send(html)
  }
}
