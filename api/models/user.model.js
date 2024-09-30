import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
      username:{
       type: String,
       required: true,
       unique: true,
      },
      fullName: {
        type: String,
        required: true
      },
      email:{
           type: String,
       unique: true,
       required: true,
      },
      password:{
        type: String,
        required: true
      },
      avatar:{
        type: String // cloudinary url
      },
      isOnline:{
        type: Boolean,
        default: false
      },
      accessToken:{
        type: String
      }
    },
    {
        timestamps: true
    }
);

userSchema.pre("save",async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
        next()
    }
    next()
});

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign({
        _id: this._id
    },
   process.env.ACCESS_TOKEN,
   {
   expiresIn: process.env.ACCESS_TOKEN_EXPIRY
   }
)
}

export const User = mongoose.model("User",userSchema);