const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.POSTGRES_SQL_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // You may need to set this depending on your SSL configuration
    },
  },
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

module.exports = sequelize;
