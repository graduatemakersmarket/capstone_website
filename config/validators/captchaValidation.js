const querystring = require('querystring');

const validateCaptcha = async (response, ip) => {
  const query = querystring.stringify({
    secret: process.env.RECAPTCHA_SECRET,
    response,
    remoteip: ip,
  });

  const endpoint = `https://www.google.com/recaptcha/api/siteverify?${query}`;
  const result = await fetch(endpoint).then((res) => res.json());

  if (result.success === undefined || !result.success) {
    return false;
  }

  return true;
};

module.exports = validateCaptcha;