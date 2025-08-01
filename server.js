const express=require('express');
const {handleMongoDbConnections}=require('./db');

const bodyParser=require('body-parser');
require('dotenv').config();
// console.log("All ENV Vars:", process.env); // Check what variables are available


const personRouter=require('./routes/person')
const menuRouter=require('./routes/menuRouter');
const app=express();
const mdburl=process.env.DB_URL;
console.log("mdburl",mdburl);

handleMongoDbConnections(mdburl).then(()=>{
    console.log('mongodb conected');
})
app.use(bodyParser.json());

app.get('/',(req,res)=>{
res.send(`<h1>Wellcom to Pacific Hotel! How May help You?</h1>`)
})

app.use('/person',personRouter);
app.use('/menu',menuRouter);




// git added 



const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})