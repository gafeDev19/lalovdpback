const pool = require('../config/dbConn')

const getBudgetDetail = async (budgetId) => {
    return await pool.query(`SELECT bp.*, p.description as product_description, p.size as product_size, p.code as product_code FROM budgets_products bp INNER JOIN products p ON p.id = bp.product_id WHERE budget_id = ${budgetId};`)
}

module.exports = {
    getBudgetDetail
}
