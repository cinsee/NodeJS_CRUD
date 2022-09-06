const mongoose = require('mongoose')

let billSchema = mongoose.Schema({
    invoiceNumber:Number,
    name:String,
    address:String,
    tel:String,
    email:String,
    total:Number
})



let Bill = mongoose.model("Bills",billSchema)

module.exports = Bill