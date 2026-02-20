const { URL } = require('node:url');
const { authenticate } = require('./middleware/authenticate');
const { handlePageRoute } = require('./routes/pages');
const { handleApiRoute } = require('./routes/api');

function sendJson(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json' });
  res.end(JSON.stringify(body));
}

function sendHtml(res, status, html) {
  res.writeHead(status, { 'content-type': 'text/html; charset=utf-8' });
  res.end(html);
}

function requestHandler(req, res) {
  const parsedUrl = new URL(req.url, 'http://localhost');
  const { pathname } = parsedUrl;

  if (pathname === '/health') {
    return sendJson(res, 200, { ok: true });
  }

  const authResult = authenticate(req.headers);
  if (authResult.error) {
    return sendJson(res, authResult.error.status, authResult.error.body);
  }

  const pageResponse = handlePageRoute(pathname, authResult.user);
  if (pageResponse) {
    if (pageResponse.html) {
      return sendHtml(res, pageResponse.status, pageResponse.html);
    }
    return sendJson(res, pageResponse.status, pageResponse.body);
  }

  const apiResponse = handleApiRoute(pathname, authResult.user);
  if (apiResponse) {
    return sendJson(res, apiResponse.status, apiResponse.body);
  }

  return sendJson(res, 404, { error: 'Not found' });
}

module.exports = { requestHandler };
