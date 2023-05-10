import mongoose from "mongoose";
const Schema = mongoose.Schema;

const data = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
},{timestamps:true})

const profiles = mongoose.model('profiles', data);

export default profiles;