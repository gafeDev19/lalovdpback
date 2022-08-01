import Budget from '../models/Budget'

const getBudgets = async (req, res, next) => {
    try {
        const response = await Budget.getAll()
        console.log("1000 Budgets => ")
        console.log(response.rows)
        res.status(200).json(response.rows)
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const getBudgetById = async (req, res, next) => {
    const id = req.params.id
    
    try {
        const response = await Budget.getById(id)
        res.status(200).json(response)
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const createBudget = async (req, res, next) => {
    const params = req.body

    //Validations
    if(!("total" in params)){
        return res.status(400).json({
            message: 'El campo total es obligatorio.'
        }) && next()
    }else{
        if(params.total === '' || params.total === null || params.total === 'null'){
            return res.status(400).json({
                message: 'El campo total es obligatorio.'
            }) && next()
        }
    }

    if(!("products" in params)){
        return res.status(400).json({
            message: 'Debe agregar productos para guardar un pedido.'
        }) && next()
    }

    try {
        const response = await Budget.create(params)
        res.status(200).json({
            message: 'Pedido cargado.'
        })
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const updateBudget = async (req, res, next) => {
    const id = req.params.id
    const params = req.body

    //Validations
    if(!("total" in params)){
        return res.status(400).json({
            message: 'El campo total es obligatorio.'
        }) && next()
    }else{
        if(params.total === '' || params.total === null || params.total === 'null'){
            return res.status(400).json({
                message: 'El campo total es obligatorio.'
            }) && next()
        }
    }

    if(!("products" in params)){
        return res.status(400).json({
            message: 'Debe agregar productos para guardar un pedido.'
        }) && next()
    }

    try {
        const response = await Budget.update(id, params)
        res.status(200).json({
            message: 'Pedido actualizado.'
        })
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const deleteBudget = async (req, res, next) => {
    const id = req.params.id

    try {
        const response = await Budget.deleteBudget(id)
        res.status(200).json({
            message: 'Pedido eliminado.'
        })
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

module.exports = {
    getBudgets,
    getBudgetById,
    createBudget,
    updateBudget,
    deleteBudget
}