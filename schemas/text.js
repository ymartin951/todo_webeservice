const mongoose = require('mongoose');

mongoose.connect('http://localhost:2701/todoDB',{ useNewUrlPaser:true });

const todoSchema = mongoose.