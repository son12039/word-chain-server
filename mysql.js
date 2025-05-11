import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const connectionConfig = {
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: parseInt(process.env.MYSQLPORT),
};

let DBConnection;
export const createDBConnection = () => {
  DBConnection = mysql.createConnection(connectionConfig);

  DBConnection.connect((error) => {
    if (error) {
      console.error("데이터베이스 연결 실패:", error);
      return;
    }
    console.log("데이터베이스 연결성공");
  });

  return DBConnection;
};
