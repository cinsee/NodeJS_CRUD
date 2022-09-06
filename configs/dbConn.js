const mongoose = require('mongoose')
const dbUrl = 'mongodb+srv://mooncz:YVi4Zf7bHK7gBC35@cluster0.uht1nnj.mongodb.net/?retryWrites=true&w=majority'

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    } catch (err) {
        console.error(err)
    }
}

module.exports = connectDB