const pool = require('../config/dbConn')

const getAll = async () => {
    return await pool.query('SELECT * FROM products WHERE active = true ORDER BY id ASC;')
}

const getById = async (id) => {
    return await pool.query(`SELECT * FROM products WHERE id = ${id};`)
}

const create = async (params) => {
    return await pool.query(
        'INSERT INTO products (code, description, size, price, price_iva, stock, active) VALUES ($1, $2, $3, $4, $5, $6, $7);',
        [
            parseInt(params.code),
            params.description,
            params.size,
            parseFloat(params.price),
            parseFloat(params.price_iva) ? parseFloat(params.price_iva) : null,
            parseInt(params.stock) ? parseInt(params.stock) : null,
            true
        ]
    )
}

const update = async (id, params) => {
    return await pool.query(
        `UPDATE products SET 
            code = ${parseInt(params.code)},
            description = '${params.description}',
            size = '${params.size}',
            price = ${parseFloat(params.price)},
            price_iva = ${parseFloat(params.price_iva) ? parseFloat(params.price_iva) : null},
            stock = ${parseInt(params.stock) ? parseInt(params.stock) : null}
        WHERE id = ${id};`
    )
}

const deleteProduct = async (id) => {
    return await pool.query(`UPDATE products SET active = false WHERE id = ${id};`)
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteProduct
}
