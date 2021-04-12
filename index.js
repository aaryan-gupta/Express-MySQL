const express = require("express")
const app = express()
const path = require("path")
const mysql = require("mysql")
// const bodyParser = require("body-parser")

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

var config = {
    host: "localhost",
    user: "root",
    password: "",
    database: "miniproject2021"
}

var dbcon = mysql.createConnection(config)
dbcon.connect((error) => {
    if (error) console.log(error.message)
    else console.log("Successful")
})

app.get("/", (request, response) => {
    response.sendFile(path.join(process.cwd(), "public", "index.html"))
})

app.post("/signupProcess", (req, res) => {
    // console.log(req.body)
    dbcon.query(`insert into users set ?`, req.body, (error, result) => {
        if (error) console.log(error.message)
        else {
            console.log("Record Saved")
            res.end("Record Saved")
            // res.json(result)
        }
    })
    // res.json(req.body) // IN CASE OF POST
})
app.post("/showall", (req, res) => {
    dbcon.query("select * from users", (err, result) => {
        if (err) console.log(err)
        else {
            console.log(result)
            res.json(result)
        }
    })
})
app.post("/show", (req, res) => {
    dbcon.query("select * from users where uid=?", [req.body.uid], (err, result) => {
        if (err) console.log(err)
        else {
            console.log(result)
            res.json(result)
        }
    })
})
app.post("/update", (req, res) => {
    var { uid, password, mobile } = req.body;
    dbcon.query("update users set password=?, mobile=? where uid=?", [password, mobile, uid], (err, result) => {
        if (err) console.log(err)
        else {
            console.log(result)
            res.json(result)
        }
    })
})
app.post("/delete", (req, res) => {
    dbcon.query("delete from users where uid=?", [req.body.uid], (err, result) => {
        if (err) console.log(err)
        else {
            console.log(result)
            res.json(result)
        }
    })
})

app.listen(8000, () => console.log("http://localhost:8000"))