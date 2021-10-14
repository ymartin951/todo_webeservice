import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import TodoModel from './schemas/todo_schema.js';
dotenv.config();
const app = express();
app.use(express.json());

const DB = process.env.DB
const port = 3000;

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log(err);
});




//get all todos (completed or not)
//get one todo
//create todo
//patch one todo
//delete todo


app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Welcome to the todo API.'
    })
})

///get all todos
app.get('/todos',async (req,res)=>{
const todoModel = await TodoModel.find({});
if(todoModel){
    return res.status(200).json({
        status:true,
        message: 'Todos fetched successfully',
        data: todoModel
    })
}else{
    return res.status(400).json({
        status:false,
        message: 'Todos not found'
    })
}
})

///get one todo (:id)
app.get('/todos/:id',async(req,res)=>{

const {id} = req.params;

    const todoModel = await TodoModel.findById(id);
    if(todoModel){
        return res.status(200).json({
            status:true,
            message: 'Todos fetched successfully',
            data: todoModel
        })
    }else{
        return res.status(400).json({
            status:false,
            message: 'Todos not found'
        })
    }
})

///create a todo
app.post('/todo',async(req,res)=>{
const {title,description,date_time} = req.body;

const todoModel = await TodoModel.create({
    title,
    description,
    date_time
})

    if(todoModel){
        return res.status(201).json({
            status:true,
            message: 'Todos created',
            data: todoModel
        })
    }else{
        return res.status(400).json({
            status:false,
            message: 'Todos failed to create'
        })
    }
})

app.patch('/todos/:id', async(req,res)=>{
    const {id} = req.params;
    const {status} = req.body;

    const todoModel = await TodoModel.updateOne({status: status}).where({_id: id});
    
    if(todoModel){
        return res.status(200).json({
            status:true,
            message: 'Todos marked as completed!',
            data: todoModel
        })
    }else{
        return res.status(400).json({
            status:false,
            message: 'Todos failed to update'
        })
    }
})


///delete a todo
app.delete('/todos/:id', async(req,res)=>{
const todoModel = await TodoModel.findByIdAndDelete(req.params.id);

if(todoModel){
    return res.status(200).json({
        status:true,
        message: 'Todo deleted!',
        data: todoModel
    })
}else{
    return res.status(400).json({
        status:false,
        message: 'Todos failed to delete'
    })
}

})



app.listen(port, () => console.log(`Example app listening on port ${port}!`));

/// to start the server: npx nodemon start