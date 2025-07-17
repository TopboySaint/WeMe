const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
app.use(cors())
app.use(express.json());
 const uri = process.env.URI
 const port = process.env.PORT || 5010


const connection = mongoose.connect(uri)
.then((response)=>{
    console.log('connected to mongodb');  
})
.catch((err) =>{
    console.log('error connecting to mongoose');  
})

const userSchema = new mongoose.Schema({
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true}
})

const userModel = mongoose.model('WeMe', userSchema)




app.get('/test', (req, res)=>{
   res.status(201).json({message: 'Let us connect'})
})

app.post('/signup', (req, res)=>{
// console.log(req.body);
    const user = new userModel(req.body)
    user.save()
.then((user)=>{
    console.log('user saved successfully');
    res.status(201).json({message: 'user saved successfully'})
})
.catch((err)=>{
    console.log('error saving user', err);
    res.status(501).json({message: 'user not saved'})

})
})

app.post('/signin', (req, res)=>{
 const userData = {
    email : req.body.email,
    password : req.body.password
 }

 userModel.findOne({email: userData.email})
 .then((foundUser)=>{

if(!foundUser || foundUser == null){
    res.status(401).send('No user found')
}else{
    if(foundUser.password === userData.password){
        res.status(201).send(`Welcome ${foundUser.email}`)
    }else{
        res.status(401).send('Invalid password')
    }
}
 })
.catch((err)=>{
    console.log(`${err}`);
})
 
})


app.get('/dashboard', async(req, res)=>{
    // res.send('dashboard')
    try{
        const users = await userModel.find({}, 'firstName lastName email')
        res.status(201).json(users)
    }
    catch(err){
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
})









app.listen(port, ()=>{
    console.log('May look like overnight success');   
})