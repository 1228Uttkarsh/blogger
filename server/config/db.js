
// Here importing the mongoose module
const mongoose = require('mongoose');
const connectDB = async() => {

    try{
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database Connected: ${conn.connection.host}`);
        }catch(error){
            console.log(error);
        }
}

module.exports = connectDB;//this will help to use the above functions outside this file.