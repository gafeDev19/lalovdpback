const pool = require('../config/dbConn')

const getBudgetDetail = async (budgetId) => {
    return await pool.query(`SELECT * FROM budgets_products WHERE budget_id = ${budgetId};`)
}

module.exports = {
    getBudgetDetail
}
