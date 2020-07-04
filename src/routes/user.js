import { Router } from 'express'
const router = Router()

import verifyToken from '../middleware/verifyAuth'

//import controller
import UserController from '../controllers/UserController'

//Routes
router.get('/users', verifyToken, (req, res, next) => {
    UserController.getUsers(req, res, next)
})

router.get('/user/:id', verifyToken, (req, res, next) => {
    UserController.getUserById(req, res, next)
})

router.post('/user', verifyToken, (req, res, next) => {
    UserController.createUser(req, res, next)
})

router.put('/user/:id', (req, res, next) => {
    UserController.updateUser(req, res, next)
})

router.delete('/user/:id', verifyToken, (req, res, next) => {
    UserController.unsubscribeUser(req, res, next)
})

router.post('/login', (req, res, next) => {
    UserController.login(req, res, next)
})

module.exports = router