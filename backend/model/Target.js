const {Schema,model}=require("mongoose");


const targetSchema=new Schema(
    {
    mac_addr:{
        type:String,
        required:[true,"Please enter a valie mac_addr"]
    },
    name:{
        type:String
    },
    tags:[String]
});


const Target=model("Target",targetSchema);

module.exports=Target;