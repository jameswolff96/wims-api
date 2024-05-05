const ProductModel = require('../../common/models/Product');

module.exports = {
  getAllProducts: (req, res) => {
    const { query: filters } = req;

    ProductModel.findAllProducts(filters)
      .then((products) => {
        return res.status(200).json({
          status: true,
          data: products,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          error: {
            message: 'Internal Server Error',
            errors: err,
          },
        });
      });
  },

  getProductById: (req, res) => {
    const { params: { productId } } = req;

    ProductModel.findProduct({ id: productId })
      .then((product) => {
        return res.status(200).json({
          status: true,
          data: product,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          error: {
            message: 'Internal Server Error',
            errors: err,
          },
        });
      });
  },

  createProduct: (req, res) => {
    const { body: productData } = req;

    ProductModel.createProduct(productData)
      .then((product) => {
        return res.status(201).json({
          status: true,
          data: product.toJSON(),
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          error: {
            message: 'Internal Server Error',
            errors: err,
          },
        });
      });
  },

  updateProduct: (req, res) => {
    const { params: { productId }, body: productData } = req;

    ProductModel.updateProduct({ id: productId }, productData)
      .then(() => {
        return ProductModel.findProduct({ id: productId });
      })
      .then((product) => {
        return res.status(200).json({
          status: true,
          data: product,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          error: {
            message: 'Internal Server Error',
            errors: err,
          },
        });
      });
  },

  deleteProduct: (req, res) => {
    const { params: { productId } } = req;

    ProductModel.deleteProduct({ id: productId })
      .then((numberOfEntriesDeleted) => {
        return res.status(200).json({
          status: true,
          data: {
            message: `Product with ID ${productId} has been deleted`,
            numberOfProductsDeleted: numberOfEntriesDeleted,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          error: {
            message: 'Internal Server Error',
            errors: err,
          },
        });
      });
  },
}