require('dotenv').config()
const express = require('express');
const cors = require('cors');


const app = express();

//middle ware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//api
app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]});
});

//listen
app.listen(process.env.PORT, () => {
    console.log("Server started on PORT", process.env.PORT);
});