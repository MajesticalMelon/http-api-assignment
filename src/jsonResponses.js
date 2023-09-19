const fs = require('fs');

const successJson = fs.readFileSync(`${__dirname}/../json/success.json`);
const successXml = fs.readFileSync(`${__dirname}/../xml/success.xml`);

const getSuccess = (request, response) => {
  const acceptHeader = request.headers.accept;
  response.writeHead(200, { 'Content-type': acceptHeader });

  if (acceptHeader === 'application/json') { response.write(successJson); } else if (acceptHeader === 'text/xml') { response.write(successXml); }
  response.end();
};

module.exports = { getSuccess };
