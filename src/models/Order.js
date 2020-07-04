const pool = require('../config/dbConn')
import Status from './Status'

const getAll = async () => {
    return await pool.query('SELECT o.*, s.description AS status_alias FROM orders o INNER JOIN status s ON o.status_id = s.id ORDER BY o.id DESC;')
}

const getById = async (id) => {
    return await pool.query(`SELECT o.*, s.description AS status_alias FROM orders o INNER JOIN status s ON o.status_id = s.id WHERE o.id = ${id};`)
}

const create = async (params) => {
    return await pool.query(
        `INSERT INTO orders (budget_id, date, status_id, comment, tracking_number) 
        VALUES (${params.budget_id}, NOW(), ${params.status_id}, '${params.comment}', '${params.tracking_number}');`)
}

const update = async (id, params) => {
    return await pool.query(
        `UPDATE orders SET 
            status_id = ${params.status_id},
            comment = '${params.comment}',
            tracking_number = '${params.tracking_number}'
        WHERE id = ${id};`
    )
}

const deleteOrder = async (id) => {
    await pool.query(`DELETE FROM orders WHERE id = ${id};`)
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteOrder
}
