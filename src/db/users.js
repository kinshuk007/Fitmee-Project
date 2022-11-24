const mongoose=require("mongoose");
const validator=require("validator");
// connecting to database 

// Define Schema
const userSchema=new mongoose.Schema({
    username: {
        type:String,
        required:true,
        minlength:[3,"Minimum length should be 3"]
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email is already registered"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please enter valid email");
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:[5,"Minimum length should be 5"]
    },
    height:{
        type:Number,
        // required:true,
    },
    weight:{
        type:Number,
        // required:true,
    }
})
// create a new collection
const UserList=new mongoose.model("UserList",userSchema);

module.exports=UserList;





