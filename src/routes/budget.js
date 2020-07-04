import { Router } from 'express'
const router = Router()

import verifyToken from '../middleware/verifyAuth'

//import controller
import BudgetController from '../controllers/BudgetController'
import BudgetProductController from '../controllers/BudgetProductController'

//Routes
router.get('/budgets', verifyToken, (req, res, next) => {
    BudgetController.getBudgets(req, res, next)
})

router.get('/budget/:id', verifyToken, (req, res, next) => {
    BudgetController.getBudgetById(req, res, next)
})

router.post('/budget', verifyToken, (req, res, next) => {
    BudgetController.createBudget(req, res, next)
})

router.put('/budget/:id', verifyToken, (req, res, next) => {
    BudgetController.updateBudget(req, res, next)
})

router.delete('/budget/:id', verifyToken, (req, res, next) => {
    BudgetController.deleteBudget(req, res, next)
})

router.get('/budget-detail/:id', verifyToken, (req, res, next) => {
    BudgetProductController.getBudgeDetails(req, res, next)
})

module.exports = router