const mongoose = require('mongoose')

let billDetailSchema = mongoose.Schema({
    billId:Number,
    bookId:Number,
    bookName:String,
    bookPrice:Number,
    quantity:Number
})


let BillDetail = mongoose.model("BillDetails",billDetailSchema)

module.exports = BillDetail