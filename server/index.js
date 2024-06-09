// Load environment variables from .env file
require("dotenv").config();

const mysql = require("mysql2/promise");

// Check database connection
// Note: This is optional and can be removed if the database connection
// is not required when starting the application
require("./database/client").checkConnection();

// Import the Express application from app/config.js
const app = require("./app/config");

// Get the port from the environment variables
const port = process.env.APP_PORT;

// Get variables from .env file for database connection
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

class CategorySeeder {
  constructor() {
    // Create a connection pool to the database
    this.databaseClient = mysql.createPool({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });
  }

  async run() {
    // Create data
    const [result] = await this.databaseClient.query(
      "INSERT INTO category (name) VALUES ('Science-Fiction')"
    );

    return result.insertId;
  }

  close() {
    // Close the connection pool
    this.databaseClient.end();
  }
}

const createData = async () => {
  try {
    const categorySeeder = new CategorySeeder();

    const categories = await categorySeeder.run();

    categorySeeder.close();

    console.info(categories);
  } catch (err) {
    console.error("Error accessing the database:", err.message, err.stack);
  }
};

// Run the createData function
createData();


// Start the server and listen on the specified port
app
  .listen(port, () => {
    console.info(`Server is listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });
