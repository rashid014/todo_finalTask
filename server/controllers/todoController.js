const Todo = require('../model/todoModel');

const todoController = {
  getAllTodos: async (req, res) => {
    console.log("entered")
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  addTodo: async (req, res) => {
    const  {task}  = req.body;

    try {
      const newTodo = new Todo({
        task,
        completed: false,
      });
      await newTodo.save();
      res.json(newTodo);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateTodo: async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
  
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(id, { completed }, { new: true })
        .sort({ completed: 1 });
      res.json(updatedTodo);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  

  
};

module.exports = todoController;
