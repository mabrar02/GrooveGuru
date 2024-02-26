require('dotenv').config()
const cors = require('cors');

const express = require('express');
const authRoutes = require('./src/routes/authRouter');


const app = express();

//middle ware
app.use(express.json());


const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.get("/", (req, res) => {
    res.json({"mssg": "FIRST PAGE"});
})

app.get("/test", (req, res) => {
    res.json({"mssg": "testing123"});
})

app.get("/home", (req, res) => {
    res.json({"mssg": "hello"});
})

//api
app.use('/auth', authRoutes);

//listen
app.listen(process.env.PORT, () => {
    console.log("Server started on PORT", process.env.PORT);
});