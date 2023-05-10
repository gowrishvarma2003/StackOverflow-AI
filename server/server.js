import express, { json } from "express";
import mongoose from "mongoose";
import profiles from "./models/profiles.js";
import cors from "cors";
import questions from "./models/questions.js";
import nodemailer from 'nodemailer';


const app = express();
const dburl = "mongodb+srv://gowrish:nkpacmfb8m@alpha.h8dcwzs.mongodb.net/?retryWrites=true&w=majority";
app.use(cors({ origin: '*' }));
app.use(express.json());
app.listen(8000);

mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log("connected..."))
    .catch((err) => console.log(err))

    app.post('/', async (req, res) => {
        const data = new profiles({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
    
        data.save()
            .then(console.log("data saved"),
            res.json()
            )
            .catch(err => console.log(err))
    })

    app.use(express.json());
    app.post('/login', async (req, res) => {
    
        try {
            const email = req.body.email;
            const password = req.body.password;
            const usermail = await profiles.findOne({ email: email });
            if (password == usermail.password) {
                console.log(usermail.name)
                res.send(usermail)
            }
        } catch (error) {
            res.status(400).send("invalid email");
        }
    })

    app.get('/home',async(req,res)=>{
        const data = await questions.find({});
        // console.log(data)
        res.send(data);
    })

    app.post('/ask',async(req,res)=>{
        const question = req.body.question;
        const answer = req.body.answer;
        const data = new questions({
            question: question,
            answer: answer,
        })

        data.save()
            .then(console.log("data saved"),
            res.json()
            )
            .catch(err => console.log(err))
    })

    app.post('/view',async(req,res)=>{
    const question = await req.body.viewquestion;
    // console.log(question);
    if(question){
        const data = await questions.findOne({question:question})
        res.send(data);
        console.log(data)
    }
    })

    app.post('/allanswers',async(req,res)=>{
    const question = await req.body.viewquestion;
    // console.log(question);
    if(question){
        const data = await questions.findOne({question:question})
        res.send(data);
        console.log(data)
    }
})

app.post('/answer',async(req,res)=>{
    const question = req.body.viewquestion;
    const useranswer = req.body.useranswer;
    console.log(question)
    console.log(useranswer)
    if(question){
        const data = await questions.updateOne({question:question},{
            $push:{
                useranswers: {
                    useranswer:useranswer
                }
            }
        })
        console.log("useranswer saved");
        console.log(data);
        res.send(data);
    }
})

app.post('/sendotp', async (req, res) => {
    const otpgenerated = Math.round(Math.random()*10000);
    const usermail = req.body.email;
    const userdatas = await profiles.findOne({ email: usermail });
    if (userdatas.email == usermail) {
        console.log("user found");

        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'namburigowrish53222@gmail.com',
                pass: 'npmoswmgtqmswngu'
            }
        });

        let mailDetails = {
            from: 'namburigowrish53222@gmail.com',
            to: usermail,
            subject: 'Test mail',
            text: otpgenerated.toString()
        };

        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
                res.json({usermail , otpgenerated});
            }
        });
    }
})

app.post("/newpassword" , async(req,res)=>{
    const newpassword =req.body.newpassword;
    var email =req.body.email;
    
    try{
        const result = await profiles.updateOne({email} ,{
            $set:{
                password:newpassword
            }
        });
        if(result.acknowledged == true){
            res.json();
        }
    }
    catch(err){
        console.log(err);
    }
})