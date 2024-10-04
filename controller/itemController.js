const asyncHandler = require('express-async-handler')
const Item = require('../model/Item')

const itemController = {
    list: asyncHandler(async(req,res) => {
        const {category} = req.query;

        if(category === 'all') {
            const items = await Item.find()
            res.json(items)
        } else {
            const items = await Item.find({category})
            res.json(items)
        }
    }),
    single_item: asyncHandler(async(req,res) => {
        const {id} = req.params
        console.log('single_item fired', id)
        const item = await Item.findById(id)
        res.json(item)
    }),
    add: asyncHandler(async(req,res) => {
        const { itemName,price,quantity,description,category,image} = req.body

        if(!itemName || !price || !quantity || !category) {
            throw new Error('Please fill out all fields.')
        }

        const item = await Item.create({
            itemName,
            price,
            quantity,
            description,
            image,
            category
        })

        res.json({
            message: 'Product added',
            product: {
                id: item._id,
                itemName,
                price,
                quantity,
                image,
                category
            }
        })
    }),

    remove: asyncHandler(async(req,res) => {
        const { itemName } = req.body

        if(!itemName) {
            throw new Error('please fill out field')
        }

        const deletedItem = Item.deleteOne({itemName})
            .then(result => console.log('Item deleted', result))
            .catch(err => console.error('Error deleting document', err))

        if(deletedItem) {
            res.json({
                message: 'Item deleted.'
            })
        } else {
            res.json({
                message: 'Item not found.'
            })
        }
    }),

    update: asyncHandler(async(req,res) => {
        const {itemName,newItemName,price,quantity,description,image,category} = req.body

        const item = await Item.findOneAndUpdate(
            {
                itemName
            },
            {   
                itemName: newItemName,
                price,
                quantity,
                description,
                image,
                category,
            },
            {
                new: true
            }
        ).then(result => {
            res.json({
                message: 'Item updated',
                result
            })
        })
        .catch(err => {
            res.json({
                message: 'Error updating item',
                error: err.message
           })
        })
    }),

    delete: asyncHandler(async(req,res) => {
        const {itemName} = req.body

        await Item.deleteOne({itemName})

        res.json({
            message: 'This item has been deleted'
        })
    })
}

module.exports = itemController
