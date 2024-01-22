const port = 4000;
//Database password: s6Oh5o0ei4IwYC2m
//Database username: namanmaurya29
const express= require('express');
const app = express();
const mongoose =require('mongoose');
const jwt= require('jsonwebtoken');
const multer = require('multer');
const path= require('path');
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
//mongodb connect with express.js
mongoose.connect("mongodb+srv://namanmaurya29002:s6Oh5o0ei4IwYC2m@cluster0.c413luw.mongodb.net/e-commerce")
//API creation
app.get("/",(req,res)=>{
    res.send("Express App is running")
})

//Image Storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

//Creating upload endpoint for images
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})
//Schema for Creating Products

const Product= mongoose.model('Product',{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    }

})


app.listen(port,(error)=>{
    if(!error){
        console.log("Server Running on Port "+port);
    }
    else{
        console.log("Error: "+error);
    }
})

