const router = require('express').Router();

const orderModel = require('./ordersModel');

router.get('/all', async (req, res, next) => {
    try{
        const orders = await orderModel.all()
        res.status(200).json(orders.map(order => {
            return{
                id: order.id,
                orderNumber: order.orderNumber,
                name: order.name,
                item: order.item,
                cost: `$${order.cost}`,
                paid: `${order.paid === 1 ? 'yes' : 'no'}`
            }
        }))
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try{
        let id = req.params.id
        const order = await orderModel.findByOrderNumber(id)
        const selectedOrder = {
            id: order.id,
            orderNumber: order.orderNumber,
            name: order.name,
            item: order.item,
            cost: `$${order.cost}`,
            paid: `${order.paid === 1 ? 'yes' : 'no'}`
        }
        console.log(id, selectedOrder)
        res.status(200).json(selectedOrder)
    } catch (err) {
        next(err)
    }
})

router.post('/new', async (req, res, next) => {
    try{
        let newOrder = req.body;
        const order = await orderModel.add(newOrder)
        const selectedOrder = {
            id: order.id,
            orderNumber: order.orderNumber,
            name: order.name,
            item: order.item,
            cost: `$${order.cost}`,
            paid: `${order.paid === 1 ? 'yes' : 'no'}`
        }
        res.status(201).json({message: 'order successfully added', selectedOrder})
    } catch(err) {
        next(err)
    }
})

router.delete('/delete/:id', async (req, res, next) => {
    try{
        let id = req.params.id
        const deletedOrder = await orderModel.remove(id)
        if(deletedOrder > 0) {
            res.status(200).json({message: 'order deleted', deletedOrder})
        } else {
            res.status(404).json({message: "Order Not Found"})
        }
        
    } catch(err) {
        next(err)
    }
})

module.exports = router