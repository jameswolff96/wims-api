const { productPriceUnits } = require('../../config');
const { uom } = require('../../config');
module.exports = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1,
      maxLength: 255,
    },
    description: {
      type: 'string',
      minLength: 1,
      maxLength: 255,
    },
    price: {
      type: 'number',
      minimum: 0,
    },
    priceUnit: {
      type: 'string',
      enum: Object.values(productPriceUnits),
    },
    quantity: {
      type: 'number',
    },
    defaultUnitOfMeasure: {
      type: 'string',
      enum: Object.values(uom),
    },
    alternateUnitOfMeasure: {
      type: 'string',
      enum: Object.values(uom),
    },
    lastOrdered: {
      type: 'string',
    },
    lastSold: {
      type: 'string',
    },
    location: {
      type: 'string',
    },
  },
  required: ['name', 'description', 'price', 'quantity', 'defaultUnitOfMeasure', 'location'],
  additionalProperties: false,
};