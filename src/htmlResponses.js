const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

const getHome = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

module.exports = { getHome };