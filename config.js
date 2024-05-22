module.exports = {
  port: 8080,
  jwtSecret: 'jwt-secret-key-replace-this-key',
  jwtExpirationInSeconds: 60 * 60 * 24,
  roles: {
    USER: 'user',
    ADMIN: 'admin',
  },
  productPriceUnits: {
    USD: 'usd',
    EUR: 'eur',
  },
  uom: {
    EACH: 'ea',
    CASE: 'cs',
    PACKAGE: 'pkg',
    GALLON: 'gal',
    POUND: 'lb',
    OUNCE: 'oz',
    LITER: 'l',
    KILLOGRAM: 'kg',
  }
}