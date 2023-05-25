const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = express()

app.use(cors())
dotenv.config()
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const computerSchema = new mongoose.Schema({
    name: String,
    price: Number,
    desc: String,
    imageURL: String,
});

const computerModel = mongoose.model('Computer', computerSchema);

//POST

app.post(`/api/computer`,async(req,res)=>{
    const{name,price,desc,imageURL}  =req.body
    const newComp = computerModel({
        name:name,
        price:price,
        desc:desc,
        imageURL:imageURL,
    })
    await newComp.save()
    res.status(200).send({
        message:'Posted succesfully!',
        payload:newComp
    })
})

//GET DATAS

app.get(`/api/computer`,async(req,res)=>{
    const {name} = req.query
     newGet = await computerModel.find()
    if(!name){
        res.status(200).send(newGet)
    }
    else{
        searchedComp = newGet.filter((x)=>
        x.name.toLowerCase().trim().includes(name.toLowerCase().trim())
        )
        res.status(200).send(searchedComp)
    }
})
//get datas by ID
app.get(`/api/computer/:id`,async(req,res)=>{
    const {id} = req.params
    newID = await computerModel.findById(id)
    res.status(200).send(newID)
})


//DELETE
app.delete(`/api/computer/:id`,async(req,res)=>{
    const id = req.params.id
    newDelete = await computerModel.findByIdAndDelete(id)
    res.status(202).send({
        message:`${newDelete.name} deleted successfully!`
    })
})


//PUT
app.put(`/api/computer/:id`,async(req,res)=>{
    const id = req.params.id
    const{name,price,desc,imageURL}  =req.body
    const newPut = {
        name:name,
        price:price,
        desc:desc,
        imageURL:imageURL,
    }
    await computerModel.findByIdAndUpdate(id,newPut)
    res.status(200).send(newPut)
})





DB_PASSWORD = process.env.DB_PASSWORD
DB_CONNECTION = process.env.DB_CONNECTION

mongoose.connect(DB_CONNECTION.replace('<password>', DB_PASSWORD)).then(() => {
    console.log('MangoDB connected!')
});



PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
