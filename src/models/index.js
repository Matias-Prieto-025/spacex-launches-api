const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname  }/../../config/database.js`)[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

/**
 *  TO ADD NEW MODELS, ADD TO "models" JSON
 */

const models = {
  Favorite: require('./Favorite').init(sequelize, Sequelize),
};

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models));

const db = {
  ...models,
  sequelize
};

module.exports = db;