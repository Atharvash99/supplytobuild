const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    name: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    address: { type: String, require: true, unique: true },
    isAdmin:{type:Boolean,default:false}
})
module.exports=User=mongoose.model('user',UserSchema)