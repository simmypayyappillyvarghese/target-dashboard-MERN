const router=require("express").Router();
const Target=require("../model/Target");

//Get Route

//Fetches all the Target data and returns as a response

router.get("/",async (req,res)=>{

    try{
        const targetData=await Target.find({});
        res.status(200).json(targetData);
    }
    catch(e){
        console.log(e);
    }

});


//Update Route

/*
Looks for the target data with the MAC ADDRESS 
 if found ,update the respective targets name
 else return with an error 

*/
router.put("/:id",async (req,res)=>{

  try{

    const targetData=await Target.findOne({"mac_addr":req.params.id});

    if(targetData){
        updatedData=await Target.findOneAndUpdate({"mac_addr":req.params.id},req.body,{new:true});
        res.status(200).send(updatedData);

   }
   else{

    res.status(400).send("Please enter a valid mac address");
   }
 
   
  }catch(e){
    console.log(e);
  }
    
}); 



//Filter route based on target name
//Used regex to filter the target names that contain the search parameter

router.get("/filter/:targetName",async (req,res)=>{

    try{
        const filteredData=await Target.find({"name":{$regex :".*" + req.params.targetName+ ".*"}});
        res.status(200).send(filteredData)
    }catch(e){
        console.log(e)
    }

});


//Filter route based on tag name
//Used $all operator to look for the tag in the array


router.get("/filterTag/:tag",async (req,res)=>{

    try{

        const filteredData=await Target.find({tags:{$all:[req.params.tag]}});
        console.log(filteredData);
        res.status(200).send(filteredData)
        
       
    }catch(e){
        console.log(e)
    }

});



module.exports=router;
