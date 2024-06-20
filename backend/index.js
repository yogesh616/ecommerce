require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Users = require('./UserModel/users.js'); // User model
const Products = require('./UserModel/Product.js');

const app = express();
const port = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token || req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

app.get('/users', authenticateToken, async (req, res) => {
    const users = await Users.findById(req.user.id);
    if (!users) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json([users]);
});

app.post('/register', async (req, res) => {
    const { userName, password, email, fullName } = req.body;
   
    try {
        const findUser = await Users.findOne({ $or: [{ email }, { userName }] });
        if (findUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await Users.create({
            userName,
            password: hashedPassword,
            email,
            fullName
        });
        if (newUser) {
            const token = jwt.sign({ id: newUser._id }, JWT_SECRET);
            res.cookie('token', token, { httpOnly: true });
            res.json(newUser);
        }
    } catch (err) {
        res.status(400).json({ message: 'User already exists' });
    }
});

app.post('/login',  async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        const user = await Users.findOne({ $or: [{ userName: userName }, { email: userName }] });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET);
        res.cookie('token', token, { httpOnly: true });
        res.json({ token, user: {
            userName: user.userName,
            email: user.email,
            fullName: user.fullName,
            _id: user._id
        } });
        
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/logout', (req, res) => {
    res.cookie('token', '', { httpOnly: true, expires: new Date(0), sameSite: 'Strict' });
    res.json({ message: 'Logged out successfully' });
});

// product routes

app.post('/addProduct', authenticateToken, async (req, res) => {
    try {
        const newProduct = await Products.create({
            productName: 'Trending Stylish Casual Outdoor Shoes Sneakers For Men',
            brandName: 'URBANBOX',
            imgUrl: 'https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/7/z/r/8-white-leaf-8-urbanbox-white-black-original-imagvgf4cuzs2hrw.jpeg?q=70&crop=false',
            price: 299,
            details: {
                color: 'Black',
                innerMaterial: 'Leather',
                outerMaterial: 'Leather',
                productName: 'Trending Stylish Casual Outdoor Shoes Sneakers For Men',
                occasion: 'Casual',
                size: 'M'
            },
            description: "Featuring a distinct printed upper pattern, these men's sneakers can add a touch of style to your attire, ensuring you stand out from the crowd."
        });
        res.json({ data: newProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/getProducts', async (req, res) => {
    try {
        const allProducts = await Products.find();
        if (allProducts) {
            res.json({ data: allProducts });
    }
    }
    catch (error) {
        res.status(500).json({ error: 'nothing here' });
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
