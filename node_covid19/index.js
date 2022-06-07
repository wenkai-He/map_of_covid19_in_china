const express = require('express')
var https = require("https")
var fs=require('fs')
const app = express()
const port = 5000
app.get('/api/aaa', (req, res) => {
  httpget((data)=>{
    res.send(data)
})
})
function httpget(cb){
    var data = ""
    https.get(`https://c.m.163.com/ug/api/wuhan/app/data/list-total?t=330917779330`,(res)=>{
        res.on("data",(chunk)=>{
            data+= chunk
        })
        res.on("end",()=>{
            cb(data)
        })
    })
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})