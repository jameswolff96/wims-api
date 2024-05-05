module.exports = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    newPassword: { type: 'string' },
  },
  required: ['username', 'newPassword'],
  additionalProperties: false,
};