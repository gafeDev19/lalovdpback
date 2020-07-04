import { Router } from 'express'
const router = Router()

import verifyToken from '../middleware/verifyAuth'

//import controller
import OrderController from '../controllers/OrderController'

//Routes
router.get('/orders', verifyToken, (req, res, next) => {
    OrderController.getOrders(req, res, next)
})

router.get('/order/:id', verifyToken, (req, res, next) => {
    OrderController.getOrderById(req, res, next)
})

router.post('/order', verifyToken, (req, res, next) => {
    OrderController.createOrder(req, res, next)
})

router.put('/order/:id', verifyToken, (req, res, next) => {
    OrderController.updateOrder(req, res, next)
})

router.delete('/order/:id', verifyToken, (req, res, next) => {
    OrderController.deleteOrder(req, res, next)
})

module.exports = router