const router = require('express').Router();

const AuthController = require('./controllers/AuthController');

const isAuthenticatedMiddleware = require('../common/middlewares/IsAuthenticatedMiddleware');
const SchemaValidationMiddleware = require('../common/middlewares/SchemaValidationMiddleware');

const registerPayload = require('./schemas/registerPayload');
const loginPayload  = require('./schemas/loginPayload');
const changePasswordPayload = require('./schemas/changePasswordPayload');

router.post(
  '/register',
  [SchemaValidationMiddleware.validate(registerPayload)],
  AuthController.register
);

router.post(
  '/login', 
  [SchemaValidationMiddleware.validate(loginPayload)],
  AuthController.login
);

router.patch(
  '/change-password',
  [isAuthenticatedMiddleware.check, SchemaValidationMiddleware.validate(changePasswordPayload)],
  AuthController.changePassword
)

module.exports = router;