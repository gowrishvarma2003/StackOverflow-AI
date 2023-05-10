import mongoose from "mongoose";
const Schema = mongoose.Schema;

const data = new Schema({
    question:{
        type:String,
        require:true
    },
    answer:{
        type:String,
        require:true
    },
    useranswers:[{
        username:{
            type:String,
            require:true
        },
        useranswer:{
            type:String,
            require:true
        },
        like:{
            type:Number,
            require:true
        }
    }],
    like:{
        type:Number,
        require:true
    }
},{timestamps:true})

const questions = mongoose.model('questions', data);

export default questions;