const mongoose = require('mongoose')

let cartSchema = mongoose.Schema({
    userId:Number,
    bookId:Number,
    bookName:String,
    bookPrice:Number,
    quantity:Number
})


let Cart = mongoose.model("Carts",cartSchema)

module.exports = Cart
