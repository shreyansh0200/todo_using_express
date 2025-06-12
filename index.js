const express=require('express');
const app=express();
const path=require('path');
const port=8080;
const methodOverride=require('method-override');
const {v4:uuidv4}=require('uuid');
const { log } = require('console');


app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

let tasks=[
    // {
    //     id:uuidv4(),
    //     date:"12/12/12",
    //     head:"project1",
    //     detail:"todo projecet via express",
    // },
    // {
    //     id:uuidv4(),
    //     date:"12/12/12",
    //     head:"project1",
    //     detail:"todo projecet via express",
    // },
    // {
    //     id:uuidv4(),
    //     date:"12/12/12",
    //     head:"project1",
    //     detail:"todo projecet via express",
    // },
    // {
    //     id:uuidv4(),
    //     date:"12/12/12",
    //     head:"project1",
    //     detail:"todo projecet via express",
    // },
];

app.get("/tasks",(req,res)=>{
    res.render("index.ejs",{tasks});
})

app.get("/tasks/new",(req,res)=>{
    
    res.render("new.ejs",{tasks});
})

app.post("/tasks",(req,res)=>{
    let {date,head,detail}=req.body;
    let id=uuidv4();
    console.log(req.body);
    tasks.push({id,date,head,detail});
    res.redirect("/tasks");
})

app.get("/tasks/:id",(req,res)=>{
let {id}=req.params;
let task=tasks.find((t)=>id===t.id);
res.render("show.ejs",{task});
})

app.get("/tasks/:id/edit",(req,res)=>{
    let {id}=req.params;
    let task=tasks.find((t)=>id===t.id);
    res.render("edit.ejs",{task});
    
})
app.patch("/tasks/:id",(req,res)=>{
     let {id}=req.params
    let {date,head,detail}=req.body;
    // let newTasks={id,date,head,detail};
    let task=tasks.find((t)=>id===t.id);
    task.date=date;
    task.head=head;
    task.detail=detail;
    task.id=id;
    res.redirect("/tasks");
})


app.delete("/tasks/:id",(req,res)=>{
    let {id}=req.params;
    // let task=tasks.find((t)=>id===t.id);
     tasks=tasks.filter((t)=>id!=t.id);
    res.redirect("/tasks");
})






app.listen(port,()=>{
    console.log("listening to port:8080");
})