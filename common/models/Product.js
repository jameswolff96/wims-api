const { DataTypes } = require('sequelize');
const { productPriceUnits } = require('../../config');
const { uom } = require('../../config');

const ProductModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  priceUnit: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: productPriceUnits.USD,
  },
  quantity: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  unitOfMeasure: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: uom.EACH,
  },
  lastOrdered: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  lastSold: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Unassigned',
  },
};

module.exports = {
  initialize: (sequelize) => {
    this.model = sequelize.define('product', ProductModel);
  },

  createProduct: (product) => {
    return this.model.create(product);
  },

  findProduct: (query) => {
    return this.model.findOne({ where: query });
  },

  updateProduct: (query, updatedValue) => {
    return this.model.update(updatedValue, { where: query });
  },

  findAllProducts: (query) => {
    return this.model.findAll({ where: query });
  },

  deleteProduct: (query) => {
    return this.model.destroy({ where: query });
  },
};