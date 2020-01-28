const db = require('../database/dbConfig')

module.exports = {
    all,
    add, 
    find,
    findBy,
    findById,
    findByOrderNumber,
    remove
};

function all() {
    return db('orders')
};

function find() {
    return db('orders').select('id', 'username')
};

function findBy(param) {
    return db('orders').where(param)
};

async function add(order) {
    const [id] = await db('orders').insert(order);
    return findById(id)
};

function findById(id) {
    return db('orders').where({id}).first();
}

function findByOrderNumber(id) {
    return db('orders').where({orderNumber: id}).first();
}

function remove(id) {
    return db('orders').where({orderNumber: id}).del()
}