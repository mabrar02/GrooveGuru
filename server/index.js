const express = require('express');
const app = express();

app.use("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]});
});

app.listen(5000, () => {
    console.log("Server started on PORT 5000");
});