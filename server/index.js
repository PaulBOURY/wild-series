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

class CategoryRepository {
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

  async readAll() {
    // Access data
    const [rows] = await this.databaseClient.query("SELECT * FROM category");
    return rows;
  }

  close() {
    // Close the connection pool
    this.databaseClient.end();
  }
}

const accessData = async () => {
  try {
    const categoryRepository = new CategoryRepository();

    const categories = await categoryRepository.readAll();
    console.info(categories);

    categoryRepository.close();
  } catch (err) {
    console.error("Error accessing the database:", err.message, err.stack);
  }
};

// Run the accessData function
accessData();

// Start the server and listen on the specified port
app
  .listen(port, () => {
    console.info(`Server is listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });
