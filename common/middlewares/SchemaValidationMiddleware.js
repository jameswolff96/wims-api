const Ajv = require('ajv').default;
AJV_OPS = {allErrors: true};

module.exports = {
  validate: (schema) => {
    if (!schema) {
      throw new Error('Schema is required');
    }
    
    return (req, res, next) => {
      const { body } = req;
      const ajv = new Ajv(AJV_OPS);
      const validate = ajv.compile(schema);
      const isValid = validate(body);

      if (isValid) {
        return next();
      }

      return res.status(400).json({
        status: false,
        error: {
          message: 'Invalid request payload',
          errors: validate.errors,
        },
      });
    };
  }
};