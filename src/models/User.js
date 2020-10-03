const pool = require('../config/dbConn')

const getAll = async () => {
    return await pool.query('SELECT id, username, name, last_name, dni, email, admin FROM users WHERE active = true ORDER BY id ASC;')
}

const getById = async (id) => {
    return await pool.query(`SELECT id, username, name, last_name, dni, email, admin FROM users WHERE id = ${id};`)
}

const create = async (params) => {
    return await pool.query(
        `INSERT INTO users (username, password, name, last_name, dni, email, admin, active) 
        VALUES ('${params.username}', md5('${params.password}'), '${params.name}', '${params.last_name}', ${parseInt(params.dni) ? parseInt(params.dni) : null}, '${params.email}', ${params.admin}, true);`)
}

const update = async (id, params) => {
    let q = ''
    if(params.password){
        q = `UPDATE users SET 
            name = '${params.name}',
            last_name = '${params.last_name}',
            username = '${params.username}',
            password = md5('${params.password}'),
            email = '${params.email}',
            dni = ${parseInt(params.dni) ? parseInt(params.dni) : null},
            admin = ${params.admin}
        WHERE id = ${id};`
    }else{
        q = `UPDATE users SET 
            name = '${params.name}',
            last_name = '${params.last_name}',
            username = '${params.username}',
            email = '${params.email}',
            dni = ${parseInt(params.dni) ? parseInt(params.dni) : null},
            admin = ${params.admin}
        WHERE id = ${id};`
    }

    return await pool.query(q)
}

const changePass = async (id, params) => {
    return await pool.query(
        `UPDATE users SET 
            password = md5('${params.password}')
        WHERE id = ${id};`
    )
}

const unsubscribeUser = async (id) => {
    return await pool.query(`UPDATE users SET active = false WHERE id = ${id};`)
}

const login = async (user, password) => {
    return await pool.query(`SELECT id, username, name, last_name, dni, email, admin FROM users WHERE username = '${user}' AND password = md5('${password}')`)
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    changePass,
    unsubscribeUser,
    login
}
