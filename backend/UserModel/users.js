const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ys30371:gSnQBVVZ7BiFub2M@auth.k3x3hmb.mongodb.net/?retryWrites=true&w=majority&appName=auth').then(()=>{
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