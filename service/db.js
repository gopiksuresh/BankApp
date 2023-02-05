// Database Integration

// 1. Server-mongodb-connection
//import mongoose

const mongoose= require('mongoose');


//2 state connection string via mongoose
mongoose.connect('mongodb://127.0.0.1:27017/bankServer?directConnection=true',{
    useNewUrlParser:true
    // to avoide warning we use useNewUrlParser
})
.then(() => { console.log('MongoDB connected!!');

})
.catch(err => { console.log('Failed to connect to MongoDB', err); });



//3 define bank db model
const users = mongoose.model('users',{
    //schema creation
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
})
module.exports={
    users
}
