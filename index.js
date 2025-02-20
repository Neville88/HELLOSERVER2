const express = require("express");
const app = express();

const port = 8800;

function requestLogger(request, response, next) {
    console.log(`Request method: ${request.method}, URL: ${request.url}`);
    next();
}

app.use(requestLogger);

app.get(`/`, (req, res) => {
    res.send("Hello world");
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
