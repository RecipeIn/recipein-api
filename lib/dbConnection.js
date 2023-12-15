import { config } from 'dotenv';
import mysql from 'mysql2/promise';

config();

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

const executeQuery = async (sql, values) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(sql, values);
    return rows;
  } finally {
    connection.release();
  }
};

export { executeQuery };

