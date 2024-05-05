const { roles } = require('../../config');

module.exports = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
    role: { type: 'string', enum: [roles.USER, roles.ADMIN] },
  },
  required: ['username', 'password'],
  additionalProperties: false,
};