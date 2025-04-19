const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "*"
      },
      body: ""
    };
  }

  // Proxy the request to your HTTP RPC node
  const response = await fetch('[http://35.208.243.34](http://35.208.243.34):8545', {
    method: event.httpMethod,
    headers: event.headers,
    body: event.body
  });

  const text = await response.text();

  return {
    statusCode: response.status,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "*"
    },
    body: text
  };
};