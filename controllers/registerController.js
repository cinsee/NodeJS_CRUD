const User = require("../models/User.model")
const bcrypt = require("bcrypt")


const handleNewUser = async (req,res) =>{
    const {user,pwd} = req.body
    // console.log(user,pwd)
    if(!user || !pwd ) return res.status(400).json({ 'message': 'Username and password are required'})

    const duplicate = await User.findOne({username:user}).exec()
    if (duplicate) return res.sendStatus(400)

    try{
        const hashPwd = await bcrypt.hash(pwd,10)
        const result = await User.create({
            "username": user,
            "password":hashPwd
        })
        // console.log(result)
        console.log(`Success!!\nNew User ${user} created!`)
        res.status(201).json({ "success": `New User ${user} created!`})
    }catch(err){
        res.status(500).json({ "message": err.message})
    }
}

module.exports = {handleNewUser}