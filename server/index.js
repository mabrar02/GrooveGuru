require('dotenv').config()
const cors = require('cors');

const express = require('express');
const authRoutes = require('./src/routes/authRouter');
const profileRoutes = require('./src/routes/profileRouter');


const app = express();
const corsOptions = {
    origin: process.env.APP_DOMAIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
    optionsSuccessStatus: 204,
};

//middle ware
app.use(express.json());
app.use(cors(corsOptions));
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});


//api
app.get("/", (req, res) => {
    res.json({"mssg": "FIRST PAGE"});
})
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

//listen
app.listen(process.env.PORT, () => {
    console.log("Server started on PORT", process.env.PORT);
});