const path = require('path');
const fs = require('fs');

const imageToBase64 = async (file) => fs.readFileSync(path.resolve(__dirname, file), 'base64');

module.exports = {
  imageToBase64,
};
