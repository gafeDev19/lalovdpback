const pool = require('../config/dbConn')
import BudgetDetail from './BudgetProduct'

const getAll = async () => {
    return await pool.query('SELECT * FROM budgets ORDER BY id ASC;')
}

const getById = async (id) => {
    let resBudget = await pool.query(`SELECT * FROM budgets WHERE id = ${id};`)
    let resBudgetDetail = await BudgetDetail.getBudgetDetail(id)

    const budget = resBudget.rows[0]
    budget.details = resBudgetDetail.rows

    return budget
}

const create = async (params) => {
    //Obtener usuario logueado para registrarlo en el budget

    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        const queryText = `INSERT INTO budgets (date, seller, customer, city, address, total, user_id) 
        VALUES (NOW(), '${params.seller}', '${params.customer}', '${params.city}', '${params.address}', ${parseFloat(params.total)}, 1) RETURNING id;`
        const res = await client.query(queryText)
        const newBudgetId = res.rows[0].id
        
        //Create detail
        for (let product of JSON.parse(params.products)) {
            let budgetDetail = await client.query(`INSERT INTO budgets_products (product_id, budget_id, quantity, price, subtotal) 
            VALUES (${parseInt(product.id)}, ${newBudgetId}, ${parseInt(product.quantity)}, ${parseFloat(product.price)}, ${parseFloat(product.subtotal)});`)
        }
        await client.query('COMMIT')
    } catch (e) {
        await client.query('ROLLBACK')
        throw e
    } finally {
        client.release()
    }
}

const update = async (id, params) => {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        const queryText = `UPDATE budgets SET 
                                seller = '${params.seller}',
                                customer = '${params.customer}',
                                city = '${params.city}',
                                address = '${params.address}',
                                total = '${parseFloat(params.total)}'
                            WHERE id = ${id};`
        const res = await client.query(queryText)

        let deleteDetail = await pool.query(`DELETE FROM budgets_products WHERE budget_id = ${id};`)

        //Create detail
        for (let product of JSON.parse(params.products)) {
            let budgetDetail = await client.query(`INSERT INTO budgets_products (product_id, budget_id, quantity, price, subtotal) 
            VALUES (${parseInt(product.id)}, ${id}, ${parseInt(product.quantity)}, ${parseFloat(product.price)}, ${parseFloat(product.subtotal)});`)
        }

        await client.query('COMMIT')
    } catch (e) {
        await client.query('ROLLBACK')
        throw e
    } finally {
        client.release()
    }
}

const deleteBudget = async (id) => {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        
        let deleteDetail = await pool.query(`DELETE FROM budgets_products WHERE budget_id = ${id};`)
        let deleteBudget = await client.query(`DELETE FROM budgets WHERE id = ${id};`)
        
        await client.query('COMMIT')
    } catch (e) {
        await client.query('ROLLBACK')
        throw e
    } finally {
        client.release()
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteBudget
}
