const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const EmployeeModel = require('./models/Employee')
const path = require("path");

const app = express()

app.use(cors({
    origin: [""],
    methods: ["POST", "GET"],
    credentials: true
}))

app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/login-register-employees")


app.get("/", (req, res) => {
    res.json("Hello")
})

app.post("/login", (req, res) => {
    const { email, password } = req.body
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success")
                }
                else {
                    res.json("Password is incorrect")
                }
            }
            else {
                res.json("No such records ")
            }
        })
})

app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
        .then(employees => res.json(employees))
        .catch(err => res.json(err))
}
)



app.listen(5001, () => {
    console.log("Server is running");
})