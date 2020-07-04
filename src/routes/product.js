import { Router } from 'express'
const router = Router()

import verifyToken from '../middleware/verifyAuth'

//import controller
import ProductController from '../controllers/ProductController'

//Routes
router.get('/products', verifyToken, (req, res, next) => {
    ProductController.getProducts(req, res, next)
})

router.get('/product/:id', verifyToken, (req, res, next) => {
    ProductController.getProductById(req, res, next)
})

router.post('/product', verifyToken, (req, res, next) => {
    ProductController.createProduct(req, res, next)
})

router.put('/product/:id', verifyToken, (req, res, next) => {
    ProductController.updateProduct(req, res, next)
})

router.delete('/product/:id', verifyToken, (req, res, next) => {
    ProductController.deleteProduct(req, res, next)
})

module.exports = router