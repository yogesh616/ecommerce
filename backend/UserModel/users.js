const mongoose = require('mongoose');
mongoose.connect(process.env.URI).then(()=>{
    console.log('connected to db');
}).catch(err=> {
    console.log(err);
})
const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;