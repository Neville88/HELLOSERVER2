const express = require("express");
const db = require("./config");
const app = express();

app.use(express.json());

const port = 8800;

const sql = `CREATE TABLE if not exists users (
 id int AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(15),
 email VARCHAR(10)
)`;
db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Table Created")
    });

function requestLogger(request, response, next) {
    console.log(`Request method: ${request.method}, URL: ${request.url}`);
    next();
}

app.use(requestLogger);

app.get(`/`, (req, res) => {
    res.send("Hello world");
})

app.post("/add-user",(req, res)=>{
    const {name,email}=req.body;
    const sql = `INSERT INTO users (name,email) VALUES (?,?)`;
    db.query(sql,[name,email],(error,result)=>{
        if(error) throw error;
        res.send(result);
        })
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
