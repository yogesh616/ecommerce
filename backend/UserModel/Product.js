const mongoose = require('mongoose');
mongoose.connect(process.env.URI)
    .then(() => {
        console.log('connected to db');
    })
    .catch(err => {
        console.log(err);
    });

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    details: {
        color: {
            type: String,
        },
        innerMaterial: {
            type: String,
        },
        outerMaterial: {
            type: String,
        },
        productName: {
            type: String,
        },
        occasion: {
            type: String,
        },
        size: {
            type: String,
        }
    },
    description: {
        type: String,
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
