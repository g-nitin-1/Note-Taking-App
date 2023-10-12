require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
 
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://"+process.env.USER+":"+process.env.PASSWORD+"@cluster0.e93l9ic.mongodb.net/notesDB",{useNewUrlParser:true});
// mongoose.connect("mongodb://localhost:27017/notesDB",{useNewUrlParser:true});

const notesSchema = new mongoose.Schema({
    title:String,
    content:String,
    number:String
});

const Note = new mongoose.model("Note",notesSchema);



app.get("/",function (req,res){
    res.send("App is working");
})

app.route("/notes")
    .get(function (req,res){
    async function getNotes(){
        let foundNotes = await Note.find();
        res.send(foundNotes);
    }
    getNotes();
    })
    .post(bodyParser.json(),function (req,res){
    let noteTitle = req.body.title;
    let noteContent = req.body.content;
    let noteNumber = req.body.number;
    const note = new Note({
        title : noteTitle,
        content : noteContent,
        number : noteNumber
    });
    note.save();
    res.end();
    });


app.delete("/notes/:number",bodyParser.json(),function (req,res){
    let number = req.params.number;
    async function deleteNote(){
        await Note.deleteOne({number:number});
    }
    deleteNote();
    res.end();
});

app.get("/notes/:title-:content" ,function (req,res){
    async function getNotes(){
        let foundNote = await Note.findOne({title:req.params.title,content:req.params.content});
       
        res.send(foundNote);
    }
    getNotes();
})


app.listen(5000,function (){
    console.log("Server started at port 5000");
})