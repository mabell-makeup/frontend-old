/* eslint-disable no-undef */
const jsonServer = require("json-server")
const server = jsonServer.create()
const middlewares = jsonServer.defaults({static: `${__dirname}/public`})
const port = 3000

server.use(middlewares)

// モックサーバ起動
server.listen(port, () => {
  console.log(`JSON Server is running in localhost:${port}`)
})