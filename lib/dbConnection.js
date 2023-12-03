// import mysql from 'mysql2';
// import { config } from 'dotenv';

import { PrismaClient } from "@prisma/client";

// const connection = () => {
//     config();
//     const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
//     return mysql.createPool({
//         host: DB_HOST,
//         user: DB_USER,
//         password: DB_PASSWORD,
//         database: DB_NAME,
//     });
// };

// export default connection().promise();

export const prisma = new PrismaClient();
