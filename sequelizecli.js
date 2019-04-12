require('dotenv').config();

// Used for sequelize-cli commands inside docker
module.exports = {
  development: {
    database: process.env.DB_NAME || 'nodefactory',
    username: process.env.DB_USER || 'nodefactory',
    password: process.env.DB_PASSWORD || 'nodefactory',
    host: process.env.DB_HOST || 'db',
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT || 'postgres',
    define: {
      underscored: true,
    },
  },
}
