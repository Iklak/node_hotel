const express=require('express');
const router=express.Router();
const Person=require('../models/person')





router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const savedPerson = await newPerson.save(); // ✅ no callback

    res.status(201).json(savedPerson); // 201 Created
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get('/',async(req,res)=>{
   try{
    const data=await Person.find();
    res.status(200).json(data);


   }catch(error){
    res.status(500).json({error:"internal error"})

   }
})

router.get('/:workType', async (req, res) => {
    const workType = req.params.workType;

    try {
        if (["chef", "manager", "waiter"].includes(workType)) {
            const response = await Person.find({ work: workType });
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;
    // console.log(updatedPersonData);
    // console.log(personId);

    const response = await Person.findOneAndUpdate(
      { _id: personId },
      updatedPersonData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    return res.status(200).json(response);

  } catch (err) {
    console.error("Update error:", err); // helpful
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete('/:id',async(req,res)=>{
  try{
    const personId=req.params.id;
    const response=await Person.findOneAndDelete({_id:personId});

    if(!response){
      return res.status(404).json({message:"not found"})
    }

    return res.status(200).json(response);

  }catch(error){
    return res.status(500).json({error:"internal error"});

  }
})


module.exports=router;