const http = require('node:http');
const { requestHandler } = require('./app');

const PORT = process.env.PORT || 3000;

http.createServer(requestHandler).listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
