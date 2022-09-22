const connection=require("./config/connection");
const Target=require("./model/Target");

connection.on("error",(err)=>{

console.log(err);

});

const targetData=require("./target_mac_with_name_tags.json");

connection.once("open",async()=>{

console.log(targetData);
await Target.deleteMany();
await Target.insertMany(targetData);

console.log("Seeded the Database");

process.exit(0);

});


