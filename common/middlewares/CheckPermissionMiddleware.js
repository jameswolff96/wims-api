const UserModel = require('../models/User');

module.exports = {
  check: (role) => {
    return (req, res, next) => {
      const {
        user: { userId },
      } = req;

      UserModel.findUser({ id: userId })
        .then((user) => {
          if (!user) {
            return res.status(403).json({
              status: false,
              error: {
                message: "Invalid access token, please login again.",
              },
            });
          }

          if (user.role !== role) {
            return res.status(403).json({
              status: false,
              error: {
                message: 'You do not have permission to access this resource',
              },
            });
          }

          next();
        });
    };
  }
}