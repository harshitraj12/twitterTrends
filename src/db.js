const mongoose = require('mongoose')
mongoose.connect(process.env.DB).then(()=>console.log("Connection Successful")).catch((err)=>console.log(err))
const { default: validator } = require('validator');



const contact_schema = new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        validate(value){
            if(validator.isEmail(value)!=true)  //validator module
            {
                throw new Error("Invalid Email ID");
            }
        }
    },
    subject:String,
    message:String,
    messageReceived:{
        type:Date,
        default: Date.now
    }
})

const contact = new mongoose.model("contact",contact_schema)

module.exports=contact