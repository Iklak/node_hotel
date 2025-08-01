require('dotenv').config()
const mongoose=require('mongoose');
async function handleMongoDbConnections(url) {
    await mongoose.connect(url);
    
}


module.exports={
    handleMongoDbConnections
}
