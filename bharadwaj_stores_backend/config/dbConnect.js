const mongoose = require('mongoose');

const dbConnect = ()=>{
    console.log(process.env.MONGODB_URL);
    const conn = mongoose.connect(process.env.MONGODB_URL).then((result)=>{
        console.log("Database connected successfully");
    })
    .catch((error)=>{
        console.log("Database Error "+error);
    })
}

module.exports = dbConnect;