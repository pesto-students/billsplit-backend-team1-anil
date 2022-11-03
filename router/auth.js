const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/userSchema");

router.get("/",(req,res)=>{
    res.send("Home page router");
})

router.get("/user",(req,res)=>{
    let list=[];
    User.find().then((data)=>{
        return res.status(200).json(data);
    }).catch((e)=>{
        res.status(500).json({error:"Failed to connect"})
    })
})

router.post("/register",async(req,res)=>{
    const {name,email,password,cpassword} = req.body;
    if(!name || !email || !password || !cpassword){
        return res.status(422).send("Error occured");
    }
    if(password != cpassword){
        return res.status(422).json({error:"Password and confirm password are not matching"});
    }
    User.findOne({email:email})
    .then((userExist)=>{
        if(userExist){
            return res.status(422).send("Email already exists");
        }
        const user = new User({name,email,password,cpassword});

        // hashing password using pre(save)

        user.save().then(()=>{
            res.status(201).json({message:"Data saved successfuly"});
        }).catch((e)=>{
            res.status(500).json({message:"Failed to register"});
        })
    })
    .catch((e)=>{
        res.status(500).json({error:"Failed to connect"});
    })
})

router.post("/login",async (req,res)=>{
    try{
        let token;
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(401).json({error:"Incorrect username or password"});
        }
        const userLogin = await User.findOne({email:email});
        if(userLogin){
            // comparing hashing
            const isMatched = await bcrypt.compare(password,userLogin.password);

            // jwt token generate
            token = await userLogin.generateAuthToken();

            // storing to cookie
            res.cookie("jwttokenbillsplit",token,{
                expires:new Date(Date.now() + 25892000000), //30 days expiry
                httpOnly:true
            })

            if(!isMatched){
                return res.status(401).json({error: "Incorrect username or password"});
            }else{
                return res.status(200).json({message: "login successfully"});
            }
        }else{
            return res.status(401).json({error: "Incorrect username or password"});
        }
        
    }catch(e){
        res.status(500).json({error:"Failed to connect"});
    }    
})

module.exports = router;