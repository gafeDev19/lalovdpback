import { Pool, types } from 'pg'
import dotenv from 'dotenv'
dotenv.config();

types.setTypeParser(1114, str => str);

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})

module.exports = pool