const db = require('../database/dbConfig.js')

module.exports = {
    find,
    addUser,
    findUser
}

function find() {
    return db('users')
}

function addUser(user) {
    return db('users').insert(user)
}

function findUser(username) {
    return db('users').where({ username }).first()
}