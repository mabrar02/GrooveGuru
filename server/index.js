require('dotenv').config()
const cors = require('cors');

const express = require('express');
const authRoutes = require('./src/routes/authRouter');


const app = express();

//middle ware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.get("/", (req, res) => {
    res.json({"mssg": "FIRST PAGE"});
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