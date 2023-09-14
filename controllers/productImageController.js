const productImageService = require('../services/productImageService');

/*************************************************************************************************/
/* Helper Methods
/*************************************************************************************************/
const createProductImage = async (image) => productImageService.createProductImage(image);
const getProductImagesByName = async (product_name) => productImageService.getProductImagesByName(product_name);

module.exports = {
    createProductImage,
    getProductImagesByName
  }