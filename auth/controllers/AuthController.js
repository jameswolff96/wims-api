const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserModel = require('../../common/models/User');

const {roles, jwtSecret, jwtExpirationInSeconds } = require('../../config');

const generateAccessToken = (username, userId) => {
  return jwt.sign({ username, userId }, jwtSecret, { expiresIn: jwtExpirationInSeconds });
};

const encryptPassword = (password) => {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
};

module.exports = {
  register: (req, res) => {
    const payload  = req.body;

    let encryptedPassword = encryptPassword(payload.password);
    let role = payload.role || roles.USER;

    UserModel.createUser(
      Object.assign(payload, { password: encryptedPassword, role })
    )
      .then((user) => {
        const accessToken = generateAccessToken(payload.username, user.id);

        res.status(200).json({
          status: true,
          data: {
            user: user.toJSON(),
            token: accessToken,
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

  login: (req, res) => {
    const { username, password } = req.body;

    UserModel.findUser({ username })
      .then((user) => {
        if (!user) {
          return res.status(400).json({
            status: false,
            error: {
              message: `User with username ${username} not found.`,
            },
          });
        }

        const encryptedPassword = encryptPassword(password);

        if (user.password !== encryptedPassword) {
          return res.status(400).json({
            status: false,
            error: {
              message: 'Provided username and password did not match.',
            },
          });
        }

        const accessToken = generateAccessToken(user.username, user.id);

        return res.status(200).json({
          status: true,
          data: {
            user: user.toJSON(),
            token: accessToken,
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: {
            message: 'Internal Server Error',
            errors: err,
          },
        });
      });
    },

  changePassword: (req, res) => {
    const { username, newPassword } = req.body;

    UserModel.findUser({ username })
      .then((user) =>  {
        if (!user) {
          return res.status(400).json({
            status: false,
            error: {
              message: `User with username ${username} not found.`,
            },
          });
        }

        const encryptedPassword = encryptPassword(newPassword);

        UserModel.updateUser({ id: user.id }, { password: encryptedPassword })
          .then(() => {
            return UserModel.findUser({ id: user.id });
          })
          .then((user) => {
            const accessToken = generateAccessToken(user.username, user.id);

            return res.status(200).json({
              status: true,
              data: {
                user: user.toJSON(),
                token: accessToken,
              },
            });
          })
          .catch((err) => {
            return res.status(500).json({
              status: false,
              error: {
                message: 'Internal Server Error',
                errors: err,
              },
            });
          });
      });
  }
};