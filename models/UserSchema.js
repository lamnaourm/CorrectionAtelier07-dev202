import { Schema, model } from "mongoose";


const userSchema = Schema({
    login:{type:String, required:true, unique:true},
    firstname:String,
    lastname:String,
    email:{type:String, required:true, unique:true},
    password:String,
})

export default model('user', userSchema)