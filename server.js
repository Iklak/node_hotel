const express=require('express');
const {handleMongoDbConnections}=require('./db');
const Person=require('./models/person')
const menuItem=require('./models/menu');
const bodyParser=require('body-parser');

const personRouter=require('./routes/person')
const menuRouter=require('./routes/menuRouter');
const app=express();
handleMongoDbConnections('mongodb://127.0.0.1:27017/hotels').then(()=>{
    console.log('mongodb conected');
})
app.use(bodyParser.json());

app.get('/',(req,res)=>{
res.send(`<h1>Wellcom to Pacific Hotel! How May help You?</h1>`)
})

app.use('/person',personRouter);
app.use('/menu',menuRouter);








const PORT=3000;
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})