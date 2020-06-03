const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('data.json')
const middlewares = jsonServer.defaults()

// map result to PagedResult
router.render = (req, res) => {
  // if paged, the total will in response header
  let totalInHeaderLodashWrapper = res.get('X-Total-Count');

  res.jsonp({
    totalCount: totalInHeaderLodashWrapper ? totalInHeaderLodashWrapper.value() : res.locals.data.length,
    items: res.locals.data
  })
}

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
