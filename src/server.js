const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const styleHandler = require('./cssResponses.js');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  console.log(request.url);

  switch (request.url.split('?')[0]) {
    case '/style.css':
      styleHandler.getCSS(request, response);
      break;
    case '/success':
      responseHandler.getSuccess(request, response);
      break;
    case '/badRequest':
      responseHandler.getBadRequest(request, response);
      break;
    case '/unauthorized':
      responseHandler.getUnauthorized(request, response);
      break;
    case '/forbidden':
      responseHandler.getForbidden(request, response);
      break;
    case '/internal':
      responseHandler.getInternal(request, response);
      break;
    case '/notImplemented':
      responseHandler.getNotImplemented(request, response);
      break;
    case '/':
      htmlHandler.getHome(request, response);
      break;
    case '/favicon.ico':
      break;
    default:
      responseHandler.getNotFound(request, response);
      break;
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
