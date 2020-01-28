const supertest = require("supertest")

const server = require("../server")
const ordersModel = require('./ordersModel')
const db = require("../database/dbConfig")

const testOrder1 = {
    orderNumber: "654132", 
    name: 'Eagle Man', 
    item: 'Wii', 
    cost: 116.50, 
    paid: false
};

const badTestOrder = {
    name: 'Willow', 
    item: 'Wii Game', 
    cost: 19.50, 
    paid: false
};

beforeEach(async () => {
    await db.seed.run()
})

test("get all orders with 200 status", async() => {
    const res = await supertest(server).get("/api/orders/all")
    expect(res.status).toBe(200)
})

test("get all orders from seed file", async() => {
    const res = await supertest(server).get("/api/orders/all")
    expect(res.status).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body.length).toBe(3)
})

test("api can create a new order", async() => {
    const res = await supertest(server)
        .post('/api/orders/new')
        .send(testOrder1)
    expect(res.status).toBe(201)
    expect(res.body.selectedOrder).toEqual({
        id: 4,
        orderNumber: 654132, 
        name: 'Eagle Man', 
        item: 'Wii', 
        cost: "$116.5", 
        paid: "no"
    })
})

test("api can't create a order without an order number", async() => {
    const res = await supertest(server)
        .post('/api/orders/new')
        .send(badTestOrder)
    expect(res.status).toBe(500)
})

test("api can delete a valid order", async() => {
    const res = await supertest(server).delete("/api/orders/delete/265451")
    expect(res.status).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body.deletedOrder).toBe(1)
})

test("api won't claim to delete an order that doesn't exist", async() => {
    const res = await supertest(server).delete("/api/orders/delete/123")
    expect(res.status).toBe(404)
    expect(res.type).toBe("application/json")
    expect(res.body.message).toBe("Order Not Found")
})