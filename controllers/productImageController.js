const productImageService = require('../services/productImageService');

/*************************************************************************************************/
/* Public Database Methods
/*************************************************************************************************/
const createProductImage = async (image) => productImageService.createProductImage(image);
const getProductImageByID = async (id) => productImageService.getProductImageByID(id);
const getProductImagesByName = async (product_name, limit, offset) => productImageService.getProductImagesByName(product_name, limit, offset);
const countProductImagesByName = async (product) => productImageService.countProductImageByName(product);
const deleteProductImage = async (id) => productImageService.deleteProductImage(id);

module.exports = {
    createProductImage,
    getProductImageByID,
    getProductImagesByName,
    countProductImagesByName,
    deleteProductImage
  }