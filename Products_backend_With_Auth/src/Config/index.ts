
import mssql from 'mssql'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path:path.resolve(__dirname,"../../.env")})


export const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}

const poolPromise: Promise<mssql.ConnectionPool> = new mssql.ConnectionPool(sqlConfig)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch(err => {
    console.log('Database Connection Failed! Bad Config: ', err);
    throw err;
  });

export{poolPromise}
