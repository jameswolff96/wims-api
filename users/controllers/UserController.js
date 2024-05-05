const UserModel = require('../../common/models/User');

module.exports = {
  getUser: (req, res) => {
    const {
      user: { userId },
     } = req;

    UserModel.findUser({ id: userId })
      .then((user) => {
        res.status(200).json({
          status: true,
          data: user.toJSON(),
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

  updateUser: (req, res) => {
    const { 
      user: { userId },
      body: payload,
    } = req;

    if(!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: 'Request body is empty',
        }
      });
    }

    UserModel.updateUser({ id: userId }, payload)
      .then(() => {
        return UserModel.findUser({ id: userId });
      })
      .then((user) => {
        res.status(200).json({
          status: true,
          data: user.toJSON(),
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

  deleteUser: (req, res) => {
    const {
      params: { userId },
    } = req;

    UserModel.deleteUser({ id: userId })
      .then((numberOfUsersDeleted) => {
        res.status(200).json({
          status: true,
          data: {
            message: 'User deleted successfully',
            numberOfUsersDeleted,
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

  getAllUsers: (req, res) => {
    UserModel.findAllUsers({})
      .then((users) => {
        res.status(200).json({
          status: true,
          data: users,
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

  changeRole: (req, res) => {
    const {
      params: { userId },
      body: { role },
    } = req;

    UserModel.updateUser({ id: userId }, { role })
      .then(() => {
        return UserModel.findUser({ id: userId });
      })
      .then((user) => {
        return res.status(200).json({
          status: true,
          data: user.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error:{
            message: "Internal Setver Error",
            error: err,
          },
        });
      });
  },
}