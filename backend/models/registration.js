import mongoose from "mongoose";

const registrationSchema = mongoose.Schema(
    {
        firstName:{
            type :String,
            required: true
        },
        lastName:{
            type :String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        mobile:{
            type:Number,
            required:true
        },
        password:{
            type:String,
            required: true
        }
    },
    {
        timestamps:true
    }
)

export const Registration = mongoose.model("Registration" , registrationSchema)