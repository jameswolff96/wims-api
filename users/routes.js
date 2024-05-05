const router = require('express').Router();

const isAuthenticatedMiddleware = require('../common/middlewares/IsAuthenticatedMiddleware');
const SchemaValidationMiddleware = require('../common/middlewares/SchemaValidationMiddleware');
const CheckPermissionMiddleware = require('../common/middlewares/CheckPermissionMiddleware');

const UserController = require('./controllers/UserController');

const updateUserPayload = require('./schemas/updateUserPayload');
const changeRolePayload = require('./schemas/changeRolePayload');

const { roles } = require('../config');

router.get("/", [isAuthenticatedMiddleware.check], UserController.getUser);

router.patch(
  "/",
  [
    isAuthenticatedMiddleware.check,
    SchemaValidationMiddleware.validate(updateUserPayload),
  ],
  UserController.updateUser
);

router.get(
  "/all",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.check(roles.ADMIN)],
  UserController.getAllUsers
);

router.patch(
  "/change-role/:userId",
  [
    isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.check(roles.ADMIN),
    SchemaValidationMiddleware.validate(changeRolePayload),
  ],
  UserController.changeRole
);

router.delete(
  "/:userId",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.check(roles.ADMIN)],
  UserController.deleteUser
);

module.exports = router;
