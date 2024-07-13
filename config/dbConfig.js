const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_CONNECT)
const connection =mongoose.connection;

connection.on("connected",()=>{
    console.log('Mongodb is connected');
})
connection.on('error',()=>{
    console.log('error');
})

module.exports = mongoose