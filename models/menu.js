const mongoose=require('mongoose');

const menuItemSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    price:{
        type:Number,
        required:true,
    },
    taste:{
        type:String,
        enum:['sweet','spicy','sour'],
        required:true
    },
    is_drink:{
        type:String,
        default:false
    },
    ingredient:{
        type:[String],
        default:[]
    },
    num_sales:{
        type:Number,
        default:0
    }
})

const menuItem=mongoose.model('MenuItem',menuItemSchema);
module.exports=menuItem;