const express=require("express");
const router=require("./controller/routes");
const connection=require("./config/connection");
const cors=require("cors");

const app=express();
const PORT=8000;


//MIDDLEWARE
app.use(cors());   
app.use(express.json());
app.use(express.urlencoded({extended:false}));



//ROUTING MIDDLEWARE

app.use("/api/targets/",router);


connection.once("open",()=>{

    app.listen(PORT,()=>{

        console.log(`App Listening at http://localhost:${PORT}`);
    });
    

})
