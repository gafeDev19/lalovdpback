const { Pool, types } = require('pg')
const dotenv = require('dotenv')
dotenv.config();

types.setTypeParser(1114, str => str);

//Dev
// const pool = new Pool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT
// })

//Prod
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
    // ssl: {
    //     rejectUnauthorized: false
    //   }
})

module.exports = pool