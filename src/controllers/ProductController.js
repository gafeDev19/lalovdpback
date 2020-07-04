import Product from '../models/Product'

const getProducts = async (req, res, next) => {
    try {
        const response = await Product.getAll()
        res.status(200).json(response.rows)
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const getProductById = async (req, res, next) => {
    const productId = req.params.id
    
    try {
        const response = await Product.getById(productId)
        res.status(200).json(response.rows)
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const createProduct = async (req, res, next) => {
    const params = req.body
    //Validations
    if(!("code" in params)){
        return res.status(400).json({
            message: 'El código es obligatorio.'
        }) && next()
    }else{
        if(params.code === '' || params.code === null || params.code === 'null'){
            return res.status(400).json({
                message: 'El código es obligatorio.'
            }) && next()
        }
    }

    if(!("description" in params)){
        return res.status(400).json({
            message: 'La descripción es obligatoria.'
        }) && next()
    }else{
        if(params.description === '' || params.description === null || params.description === 'null'){
            return res.status(400).json({
                message: 'La descripción es obligatoria.'
            }) && next()
        }
    }

    if(!("price" in params)){
        return res.status(400).json({
            message: 'El precio es obligatorio.'
        }) && next()
    }else{
        if(params.price === '' || params.price === null || params.price === 'null'){
            return res.status(400).json({
                message: 'El precio es obligatorio.'
            }) && next()
        }
    }

    //Create
    try {
        const response = await Product.create(params)
        res.status(200).json({
            message: 'Producto cargado.'
        })
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const updateProduct = async (req, res, next) => {
    const params = req.body
    const id = req.params.id
    //Validations
    if(id === '' || id === null || id === 'null'){
        return res.status(400).json({
            message: 'El id de producto es obligatorio'
        }) && next()
    }

    if(!("code" in params)){
        return res.status(400).json({
            message: 'El código es obligatorio.'
        }) && next()
    }else{
        if(params.code === '' || params.code === null || params.code === 'null'){
            return res.status(400).json({
                message: 'El código es obligatorio.'
            }) && next()
        }
    }

    if(!("description" in params)){
        return res.status(400).json({
            message: 'La descripción es obligatoria.'
        }) && next()
    }else{
        if(params.description === '' || params.description === null || params.description === 'null'){
            return res.status(400).json({
                message: 'La descripción es obligatoria.'
            }) && next()
        }
    }

    if(!("price" in params)){
        return res.status(400).json({
            message: 'El precio es obligatorio.'
        }) && next()
    }else{
        if(params.price === '' || params.price === null || params.price === 'null'){
            return res.status(400).json({
                message: 'El precio es obligatorio.'
            }) && next()
        }
    }

    try {
        const response = await Product.update(id, params)
        res.status(200).json({
            message: 'Producto actualizado.'
        })
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const deleteProduct = async (req, res, next) => {
    const id = req.params.id

    try {
        const response = await Product.deleteProduct(id)
        res.status(200).json({
            message: 'Producto eliminado.'
        })
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}