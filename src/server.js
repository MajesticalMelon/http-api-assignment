const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const styleHandler = require('./cssResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  console.log(request.url);

  switch (request.url) {
    case '/style.css':
      styleHandler.getCSS(request, response);
      break;
    case '/success':
      jsonHandler.getSuccess(request, response);
      break;
    case '/':
    default:
      htmlHandler.getHome(request, response);
      break;
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
