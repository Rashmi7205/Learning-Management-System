import mongoose from 'mongoose'
mongoose.set('strictQuery',false)

const MONGO_URI=process.env.MONGO_URI|| "mongodb://127.0.0.1:27017/lms"
const connectToDb = async ()=>{
    mongoose.connect(MONGO_URI)
    .then((conn)=>{
        console.log(`Db Connected Sucsessfully at ${conn.connection.host}`);
    })
    .catch((err)=>{
        console.log("ERROR ! In db connection");
        process.exit(1);
    })
}

export default connectToDb;