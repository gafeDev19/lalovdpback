import User from '../models/User'
import jwtHelper from '../helpers/jwt'

const getUsers = async (req, res, next) => {
    try {
        const response = await User.getAll()
        res.status(200).json(response.rows)
        next()
    } catch (e) {
        res.sendStatus(500) && next(error)
    }
}

const getUserById = async (req, res, next) => {
    const userId = req.params.hasOwnProperty('id') ? req.params.id : req.session.user.id

    try {
        const response = await User.getById(userId)
        res.status(200).json(response.rows)
        next()
    } catch (error) {
        res.sendStatus(500) && next(error)
    }
}

const createUser = async (req, res, next) => {
    const params = req.body

    //Validations
    if (!("username" in params)) {
        return res.status(400).json({
            message: 'El nombre de usuario es obligatorio.'
        }) && next()
    } else {
        if (params.username === '' || params.username === null || params.username === 'null') {
            return res.status(400).json({
                message: 'El nombre de usuario es obligatorio.'
            }) && next()
        }
    }

    if (!("password" in params)) {
        return res.status(400).json({
            message: 'La contraseña es obligatoria.'
        }) && next()
    } else {
        if (params.password === '' || params.password === null || params.password === 'null') {
            return res.status(400).json({
                message: 'La contraseña es obligatoria.'
            }) && next()
        }
    }

    if (!("name" in params)) {
        return res.status(400).json({
            message: 'El nombre es obligatorio.'
        }) && next()
    } else {
        if (params.name === '' || params.name === null || params.name === 'null') {
            return res.status(400).json({
                message: 'El nombre es obligatorio.'
            }) && next()
        }
    }

    if (!("last_name" in params)) {
        return res.status(400).json({
            message: 'El apellido es obligatorio.'
        }) && next()
    } else {
        if (params.last_name === '' || params.last_name === null || params.last_name === 'null') {
            return res.status(400).json({
                message: 'El apelllido es obligatorio.'
            }) && next()
        }
    }

    try {
        const response = await User.create(params)
        res.status(200).json({
            message: 'Usuario creado.'
        })
        next()
    } catch (e) {
        res.sendStatus(500) && next(e)
    }
}

const updateUser = async (req, res, next) => {
    const id = req.params.id
    const params = req.body
    
    //Validations
    if (!("username" in params)) {
        return res.status(400).json({
            message: 'El nombre de usuario es obligatorio.'
        }) && next()
    } else {
        if (params.username === '' || params.username === null || params.username === 'null') {
            return res.status(400).json({
                message: 'El nombre de usuario es obligatorio.'
            }) && next()
        }
    }

    if (!("name" in params)) {
        return res.status(400).json({
            message: 'El nombre es obligatorio.'
        }) && next()
    } else {
        if (params.name === '' || params.name === null || params.name === 'null') {
            return res.status(400).json({
                message: 'El nombre es obligatorio.'
            }) && next()
        }
    }

    if (!("last_name" in params)) {
        return res.status(400).json({
            message: 'El apellido es obligatorio.'
        }) && next()
    } else {
        if (params.last_name === '' || params.last_name === null || params.last_name === 'null') {
            return res.status(400).json({
                message: 'El apelllido es obligatorio.'
            }) && next()
        }
    }

    try {
        const response = await User.update(id, params)
        res.status(200).json({
            message: 'Usuario actualizado.'
        })
        next()
    } catch (e) {
        res.sendStatus(500) && next(e)
    }
}

const changePass = async (req, res, next) => {
    const id = req.params.id
    const params = req.body

    //Validations
    if (!("password" in params)) {
        return res.status(400).json({
            message: 'La contraseña es obligatoria.'
        }) && next()
    } else {
        if (params.password === '' || params.password === null || params.password === 'null') {
            return res.status(400).json({
                message: 'La contraseña es obligatoria.'
            }) && next()
        }
    }

    try {
        const response = await User.changePass(id, params)
        res.status(200).json({
            message: 'Contraseña actualizada.'
        })
        next()
    } catch (e) {
        res.sendStatus(500) && next(error)
    }
}

const unsubscribeUser = async (req, res, next) => {
    const id = req.params.id

    try {
        const response = await User.unsubscribeUser(id)
        res.status(200).json({
            message: 'Usuario dado de baja.'
        })
        next()
    } catch (e) {
        res.sendStatus(500) && next(error)
    }
}

const login = async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({ 'message': 'El nombre de usuario y la contraseña son obligatorios.' });
    }

    const user = req.body.username
    const password = req.body.password
    
    try {
        const response = await User.login(user, password);
        console.log('Response' + response)
        
        if (!response.rows[0]) {
            return res.status(400).send({ 'message': 'Las credenciales ingresadas son incorrectas.' });
        }

        const token = jwtHelper.generateToken(response.rows[0].id);
        const userProfile = response.rows[0];
        req.session.jwt = token;
        req.session.user = user;
        
        return res.status(200).send({ token, user: userProfile });
    } catch (error) {
        console.log('Error' + error)
        return res.status(400).send(error)
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    changePass,
    unsubscribeUser,
    login
}