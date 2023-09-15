const querystring = require('querystring');

/*************************************************************************************************/
/* You can import this into any API to make it support Google's reCaptcha service. 
/* Instructions: https://developers.google.com/recaptcha/intro
/*************************************************************************************************/
const validateCaptcha = async (response, ip) => {
  // Build a query string with the secret, response and user's ip address
  const query = querystring.stringify({secret: process.env.RECAPTCHA_SECRET, response, remoteip: ip});

  // Send a POST request to Google using the query string and wait for a response
  const endpoint = `https://www.google.com/recaptcha/api/siteverify?${query}`;
  const result = await fetch(endpoint).then((res) => res.json());

  // The result will contain a key called "success". This is how we determine if the request was bad
  if (result.success === undefined || !result.success) {
    return false;
  }

  // All good, allow the request
  return true;
};

module.exports = validateCaptcha;