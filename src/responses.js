const respondJSON = (response, file, status) => {
  response.writeHead(status, { 'Content-type': 'application/json' });
  response.write(file);
  response.end();
};

const respondXML = (response, file, status) => {
  response.writeHead(status, { 'Content-type': 'text/xml' });
  response.write(file);
  response.end();
};

const isQueryValid = (request, queryName, truthyValue) => {
  const urlQuery = request.url.split('?');
  const query = urlQuery.length > 1 ? urlQuery[1].split('=') : '';
  if (query === '') return false;
  if (query[0] !== queryName) return false;
  if (query[1] !== truthyValue) return false;
  return true;
};

const getSuccess = (request, response) => {
  const acceptHeader = request.headers.accept;

  const successXML = '<response><message>This is a successful response</message></response>';
  const successJSON = JSON.stringify({ message: 'This is a successful response' });

  if (acceptHeader === 'text/xml') {
    respondXML(response, successXML, 200);
  } else {
    respondJSON(response, successJSON, 200);
  }
};

const getBadRequest = (request, response) => {
  const acceptHeader = request.headers.accept;
  const valid = isQueryValid(request, 'valid', 'true');
  const status = valid ? 200 : 400;

  const badRequestXML = `<response>${valid
    ? '<message>This request has the required parameters</message>'
    : '<message>Missing valid query paramater set to true</message><id>badRequest</id>'}</response>`;
  const badRequestJSON = JSON.stringify(valid
    ? { message: 'This request has the required parameters' }
    : { message: 'Missing valid query paramater set to true', id: 'badRequest' });

  if (acceptHeader === 'text/xml') {
    respondXML(response, badRequestXML, status);
  } else {
    respondJSON(response, badRequestJSON, status);
  }
};

const getUnauthorized = (request, response) => {
  const acceptHeader = request.headers.accept;
  const valid = isQueryValid(request, 'loggedIn', 'yes');
  const status = valid ? 200 : 401;

  const unauthorizedXML = `<response>${valid
    ? '<message>You have successfully viewed the content</message>'
    : '<message>Missing loggedIn query paramater set to yes</message><id>unauthorized</id>'}</response>`;
  const unauthorizedJSON = JSON.stringify(valid
    ? { message: 'You have successfully viewed the content' }
    : { message: 'Missing loggedIn query paramater set to yes', id: 'unauthorized' });

  if (acceptHeader === 'text/xml') {
    respondXML(response, unauthorizedXML, status);
  } else {
    respondJSON(response, unauthorizedJSON, status);
  }
};

const getForbidden = (request, response) => {
  const acceptHeader = request.headers.accept;

  const forbiddenXML = '<response><message>You do not have access to this content</message><id>forbidden</id></response>';
  const forbiddenJSON = JSON.stringify({ message: 'You do not have access to this content', id: 'forbidden' });

  if (acceptHeader === 'text/xml') {
    respondXML(response, forbiddenXML, 403);
  } else {
    respondJSON(response, forbiddenJSON, 403);
  }
};

const getInternal = (request, response) => {
  const acceptHeader = request.headers.accept;

  const internalXML = '<response><message>Internal server error. Something went wrong</message><id>internal</id></response>';
  const internalJSON = JSON.stringify({ message: 'Internal server error. Something went wrong', id: 'internal' });

  if (acceptHeader === 'text/xml') {
    respondXML(response, internalXML, 500);
  } else {
    respondJSON(response, internalJSON, 500);
  }
};

const getNotImplemented = (request, response) => {
  const acceptHeader = request.headers.accept;

  const notImplementedXML = '<response><message>A get request has not been implemented for this content. Check again later for updated content</message><id>notImplemented</id></response>';
  const notImplementedJSON = JSON.stringify({ message: 'A get request has not been implemented for this content. Check again later for updated content', id: 'notImplemented' });

  if (acceptHeader === 'text/xml') {
    respondXML(response, notImplementedXML, 501);
  } else {
    respondJSON(response, notImplementedJSON, 501);
  }
};

const getNotFound = (request, response) => {
  const acceptHeader = request.headers.accept;

  const notFoundXML = '<response><message>The page you are looking for was not found</message><id>notFound</id></response>';
  const notFoundJSON = JSON.stringify({ message: 'The page you are looking for was not found', id: 'notFound' });

  if (acceptHeader === 'text/xml') {
    respondXML(response, notFoundXML, 404);
  } else {
    respondJSON(response, notFoundJSON, 404);
  }
};

module.exports = {
  getSuccess,
  getBadRequest,
  getUnauthorized,
  getNotFound,
  getForbidden,
  getInternal,
  getNotImplemented,
};
