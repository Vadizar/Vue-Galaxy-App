const cors_proxy = require('cors-anywhere')

const port = process.env.APP_PORT || 4000;

cors_proxy.createServer({
  originWhitelist: [],
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2']
}).listen(port, () => {
  console.log('Listening on port ' + port)
})