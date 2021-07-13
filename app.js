const express = require('express')
// const { spawn } = require('child_process');//same as below
const spawn = require('child_process').spawn;
const app = express()

const port = 3000

app.use(express.json())
app.use(express.urlencoded({
    extended:false
}))

const path=__dirname+'/views/'
app.use(express.static(path)) 

app.get('/',(req,res)=>{
    res.sendFile('index.html')
})

app.post('/python',(req,res)=>{

    var output

    let fname = req.body.fname
    let mname = req.body.mname
    let lname = req.body.lname

    const python = spawn('python', ['pyscript.py',fname]) // Passing arguments to a Python 
    
    python.stdout.on('data', function (data) {
        output = data.toString()  // getting stdout data form python
    });

    python.stderr.on('data',(err)=>{
        console.log(err.toString())  // this will print error in console if there is error
    });

    python.on('close', (code) => {
        console.log(code)   // return code is 0 for successful termination
        res.send(output)    // sending output to html page as response
    });

    python.stdin.write(mname+'\n') // add new line char when u have multiple input
    python.stdin.write(lname)
    python.stdin.end()
})


app.listen(port,()=>{
    console.log('http://localhost:'+port+'/')
})