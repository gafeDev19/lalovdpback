import Order from '../models/Order'

const getOrders = async (req, res, next) => {
    try {
        const response = await Order.getAll()
        console.log("1000 Orders => ")
        console.log(response.rows)
        res.status(200).json(response.rows)
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const getOrderById = async (req, res, next) => {
    const orderId = req.params.id
    
    try {
        const response = await Order.getById(orderId)
        res.status(200).json(response.rows)
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const createOrder = async (req, res, next) => {
    const params = req.body

    //Validations
    if(!("budget_id" in params)){
        return res.status(400).json({
            message: 'El pedido es obligatorio.'
        }) && next()
    }else{
        if(params.budget_id === '' || params.budget_id === null || params.budget_id === 'null'){
            return res.status(400).json({
                message: 'El pedido es obligatorio.'
            }) && next()
        }
    }

    if(!("status_id" in params)){
        return res.status(400).json({
            message: 'El estado es obligatorio.'
        }) && next()
    }else{
        if(params.status_id === '' || params.status_id === null || params.status_id === 'null'){
            return res.status(400).json({
                message: 'El estado es obligatorio.'
            }) && next()
        }
    }

    try {
        const response = await Order.create(params)
        res.status(200).json({
            message: 'Orden creada.'
        })
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const updateOrder = async (req, res, next) => {
    const id = req.params.id
    const params = req.body

    //Validations
    if(!("status_id" in params)){
        return res.status(400).json({
            message: 'El estado es obligatorio.'
        }) && next()
    }else{
        if(params.status_id === '' || params.status_id === null || params.status_id === 'null'){
            return res.status(400).json({
                message: 'El estado es obligatorio.'
            }) && next()
        }
    }

    try {
        const response = await Order.update(id, params)
        res.status(200).json({
            message: 'Orden actualizada.'
        })
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const deleteOrder = async (req, res, next) => {
    const id = req.params.id

    try {
        const response = await Order.deleteOrder(id)
        res.status(200).json({
            message: 'Orden eliminada.'
        })
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
}