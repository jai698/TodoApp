const mongoose = require("mongoose");
const Schema = mongoose.Schema; //mongoose return a class schema 
const ObjectId = Schema.ObjectId; //primary key

const User = new Schema({ //storing user info
  name: String,
  email: {type: String, unique: true},
  password: String
});

const Todo = new Schema({ //storing users todo
    userId: ObjectId,
    title: String,
    done: Boolean
});

const UserModel = mongoose.model('user',User);
const TodoModel = mongoose.model('todo',Todo);

module.exports = {
    UserModel,
    TodoModel
}
