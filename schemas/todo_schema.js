import  mongoose  from "mongoose";

const todoSchema = mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    date_time:{
        type:String,
        required: true
    },
    status:{
        type:Boolean,
        required: true
    }
});

const todoModel  =  mongoose.model('todo',todoSchema);

export default todoModel