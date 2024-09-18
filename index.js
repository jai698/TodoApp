const express = require("express");
const app = express();
app.use(express.json());
const {UserModel,TodoModel} = require("./db");
const jwt = require('jsonwebtoken');
const { default: mongoose } = require("mongoose");
const JWT_SECRET = "dev";
const PORT = 3001;
const bcrypt = require("bcrypt");

mongoose.connect("mongodb+srv://jai:kanishk49@cluster0.mdaxodf.mongodb.net/Todo");

app.post('/signup',async function(req,res){
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password,3);

    await UserModel.create({
        name: name,
        email: email,
        password: hashedPassword,
    })
    res.json({
        message: "You are signed up"
    })
});

app.post('/login',async function(req,res){
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({ //finds entry in db
        email: email,
    });
    const isMatchedPassword = await bcrypt.compare(password,response.password);

    if(isMatchedPassword){
        const token = jwt.sign({
            id: response._id.toString()
        },JWT_SECRET);
        res.json({
            token:token,
        })
    }
    else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
});

function auth(req,res,next){
    const token = req.headers.token;
    const response = jwt.verify(token,JWT_SECRET);
    if (response) {
        req.userId = response.id;
        next();
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
}

app.post('/todo',auth,async function(req,res){
    const userId = req.userId;
    const title = req.title;
    await TodoModel.create({
        userId:userId,
        title:title,
    })
    res.json({
        message:"todo posted"
    })
});

app.get('/todos',auth,async function(req,res){
    const userId = req.userId;
    const todos = await TodoModel.find({
        userId:userId 
    })
    res.json({
        todos,
    })
});

app.listen(PORT,function(){
    console.log(`server started at port: ${PORT}`);
});