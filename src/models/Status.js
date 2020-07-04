const pool = require('../config/dbConn')

const getAll = async () => {
    return await pool.query(`SELECT * FROM status ORDER BY id ASC;`)
}

const getById = async (id) => {
    return await pool.query(`SELECT * FROM status WHERE id = ${id};`)
}

module.exports = {
    getAll,
    getById
}
