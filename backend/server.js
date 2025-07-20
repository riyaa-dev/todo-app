const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const dotenv=require("dotenv");
const todoroutes=require("./routes/todoroutes");

dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("mongodb connected"))
.catch((err)=>console.error("DB error :",err));

app.use("/api/todos",todoroutes);
app.get("/",(req,res)=>res.send("API running"));

const PORT = process.env.PORT||5000;
app.listen(PORT,()=>console.log(`server started on port ${PORT}`));