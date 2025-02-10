const User=require("../models/userModel");
const asyncHandler = require("express-async-handler");
const createUser= asyncHandler(async (req, res) => {
    const email = req.body.email;
        const findUser= await User.findOne({email:email});
        if(!findUser){
            //create a new user
            const newUser = await User.create(req.body);
            res.json(newUser);
        }
        else{
            throw new Error("User Already Exists")
        }

});

const loginUser=asyncHandler(async(req, res) => {
    const{email, password} = req.body;
    //console.log(email, password);
    //check if user exists or not
    const findUser = await User.findOne({email});
    if(findUser && await findUser.isPasswordMatched(password)){
        res.json(findUser);
    }else{
        throw new Error("Invalid Credentials");
    }
});

module.exports = {createUser, loginUser};