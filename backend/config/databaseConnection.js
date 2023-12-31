const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config({ path: "./config/config.env" });
const connectDB =async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true,
            useUnifiedTopology: true,})
        console.log(`MongoDB connected with ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error : ${error.message}`)
        process.exit(1);
        
    }
}
module.exports=connectDB;