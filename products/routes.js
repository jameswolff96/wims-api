const router = require('express').Router();

const ProductController = require('./controllers/ProductController');

const isAuthenticatedMiddleware = require('../common/middlewares/IsAuthenticatedMiddleware');
const SchemaValidationMiddleware = require('../common/middlewares/SchemaValidationMiddleware');
const CheckPermissionMiddleware = require('../common/middlewares/CheckPermissionMiddleware');

const createProductPayload = require('./schemas/createProductPayload');
const updateProductPayload = require('./schemas/updateProductPayload');
const { roles } = require('../config');

router.get(
  "/",
  [isAuthenticatedMiddleware.check],
  ProductController.getAllProducts
);

router.get(
  "/:productId",
  [isAuthenticatedMiddleware.check],
  ProductController.getProductById
);

router.post(
  "/",
  [
    isAuthenticatedMiddleware.check, 
    CheckPermissionMiddleware.check(roles.ADMIN),
    SchemaValidationMiddleware.validate(createProductPayload)
  ],
  ProductController.createProduct
);

router.patch(
  "/:productId",
  [
    isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.check(roles.ADMIN),
    SchemaValidationMiddleware.validate(updateProductPayload)
  ],
  ProductController.updateProduct
);

router.delete(
  "/:productId",
  [
    isAuthenticatedMiddleware.check, 
    CheckPermissionMiddleware.check(roles.ADMIN)
  ],
  ProductController.deleteProduct
);

module.exports = router;