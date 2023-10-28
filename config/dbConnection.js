const mongoose = require('mongoose');

const connectDb = async () => {
    try{
       const connect = await mongoose.connect(process.env.MONGODB_CONNECTION)
       console.log(`Connection Successfull to ${connect.connection.name}`)
    }catch(err){
        console.log(err)
    }
}

module.exports = connectDb