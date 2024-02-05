const express = require('express');
const todoController = require('../controllers/todoController');

const router = express.Router();

router.get('/todos', todoController.getAllTodos);
router.post('/todos', todoController.addTodo);
router.put('/todos/:id', todoController.updateTodo);


module.exports = router;
