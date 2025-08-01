const express=require('express');
const router=express.Router();

const menuItem=require('../models/menu')

router.post('/', async(req,res)=>{
  try{
  const data=req.body;
  const newMenu= new menuItem(data);
  const savedMenu=await newMenu.save();

  res.status(200).json(savedMenu);

  }catch(err){
    res.status(500).json({err:"internal error"})

  }
})


router.get('/',async(req,res)=>{
  try{
    const data=await menuItem.find();
    res.json(data);

  }catch(error){
   res.status(500).json({error:"internal error"})
  }
})

router.get('/:taste',async(req,res)=>{
  const taste=req.params.taste;
  try{
    if(["sweet","spicy","sour"].includes(taste.toLowerCase())){
      const response=await menuItem.find({taste:taste})
      res.status(200).json(response);
    }else{
      res.status(404).json({message:"item not found"});
    }

  }catch(err){
    res.status(500).json({message:"internal error"})

  }
})

router.put('/:id',async(req,res)=>{
 try{
    const menuId=req.params.id;
  const menuBody=req.body;
  const response=await menuItem.findByIdAndUpdate({_id:menuId},menuBody);
  if(!response){
    return res.status(404).json({message:'menu not found'})
  }
   return res.status(200).json(response);

 }catch(err){
  return res.status(500).json({err:"internal error"})

 }
})

router.delete('/:id',async(req,res)=>{
  try{
    const menuId=req.params.id;
    const response=await menuItem.findByIdAndDelete({_id:menuId});
    if(!response){
      return res.status(404).json({message:"menu item not found"})
    }

    return res.status(200).json(response);

  }catch(error){
    return res.status(500).json({error:"internal server error"});
  }
})
module.exports =router;