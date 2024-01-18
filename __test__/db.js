import mysql from "mysql2/promise";

const connectionConfig = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "db_recipein",
};

export const createDatabaseConnection = async () => {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    return connection;
  } catch (error) {
    console.error("Database connection error:", error.message);
    throw error;
  }
};
