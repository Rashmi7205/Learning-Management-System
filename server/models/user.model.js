import { model,Schema } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';


const userSchema = new Schema({
    fullName:{
        type:String,
        required:[true,"Name is Required"],
        minLength:[5,"name must be atleast 5 char"],
        maxLength:[50,"name should not be more then 50 char"],
        trim:true,
        lowercase:true
    },
    email:{
        type:String,
        required:[true,"Email is Required"],
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:[true,"password is Required"],
        minLength:[8,'PAssword must be 8 char'],
        select:false
    },
    avatar:{
        public_id:{
            type:String
        },
        secure_url:{
            type:String
        }
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:'USER'
    },
    forgotPasswordToken:String,
    forgotPasswordExpiaryDate:Date

},{
    timestamps:true
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods ={
    generateJWTtoken:async function(){
        return await jwt.sign({
            id:this._id,
            email:this.email,
            subscription:this.subscription
            }
            ,process.env.JWT_SECRET,
            {
                expiresIn:process.env.JWT_EXPIRY
            }
        )
    },
    comparePassword:async function(plainTextPassword){
        return await bcrypt.compare(plainTextPassword,this.password);
    },
    generatePasswordResetToken:async function(){
        const resetToken = crypto.randomBytes(20).toString('hex');

        this.forgotPasswordToken = crypto
                .createHash('sha256')
                .update(resetToken)
                .digest('hex');
            
        this.forgotPasswordExpiaryDate = Date.now()+15*60*1000; /// 15 min from now

        return resetToken;

    }
}
const User = model("User",userSchema);

export  default User

