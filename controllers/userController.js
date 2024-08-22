

const User = require('../models/User');
let catchasync=require('../utils/catchasync')

exports.createUser=catchasync(async(req,res)=>{
let user=await User.create(req.body)
res.json({user})

})