require('dotenv').config()
const cors = require('cors');

const express = require('express');
const loginRoutes = require('./src/routes/loginRouter');


const app = express();

//middle ware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//api
app.use('/login', loginRoutes);

app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]});
});

//listen
app.listen(process.env.PORT, () => {
    console.log("Server started on PORT", process.env.PORT);
});