const Todo = require("../models/todo");

exports.getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

// POST new todo
exports.addTodo = async (req, res) => {
  const newtodo = new Todo({ text: req.body.text });
  const saved = await newtodo.save();
  res.json(saved);
};

// DELETE a todo
exports.deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

// PATCH toggle complete
exports.toggleTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
};
