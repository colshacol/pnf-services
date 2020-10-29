module.exports = (req, res) => {
  const { name = "World" } = req.query
  res.send(`<div id="yolo"><h1>Hello</h1><h6>${name}!</h6></div>`)
}
