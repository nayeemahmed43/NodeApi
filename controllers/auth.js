const jwt = require("jsonwebtoken");
const User = require("../models/user");


exports.signup = async (req,res) =>{
    const userExists = await User.findOne({email:req.body.email})
    if(userExists) return res.status(403).json({
        error: "Email is taken"
    })
    //new user creation
    const user = await new User(req.body)
    await user.save();
    res.status(200).json({message: "signup success! please log in"});

};



exports.signin = (req, res) =>{
    //find user based on user
    const {email,password} = req.body
    user.findOne({email}, (err,user) =>{
        //if err or no user
        if(err || !user){
            return res.status(401).json({
                error: "User with that email does not exist.please sign in "
            })
        }
       
        //if user is found make sure the email and password match
        //create authenticate method in model and use here
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and password do not match "
            })
        }
        
        
        //generate a token with user id and secret
        const token = jwt.sign({_id: user._id},process.env.JWT_SECRET);
        //persist the token as 't' in cookie with expiry date
        res.cookie("t", token, {expire: new Date() + 9999})
        //return response with user and token to front end client
        const {_id, name, email} = user;
        return res.json({token, user:{_id,email,name}})
    });
};



exports.signout = (req,res) =>{
    res.clearCookie("t");
    return res.json({message: "Signout success!"});
}
