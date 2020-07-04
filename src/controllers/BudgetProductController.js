import BudgetProduct from '../models/BudgetProduct'

const getBudgeDetails = async (req, res, next) => {
    const id = req.params.id
    
    try {
        const response = await BudgetProduct.getBudgetDetail(id)
        res.status(200).json(response.rows)
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

module.exports = {
    getBudgeDetails
}