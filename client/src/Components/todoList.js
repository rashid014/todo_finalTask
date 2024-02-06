import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import './todoList.css';


const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [task, setTask] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [completedPage, setCompletedPage] = useState(1);
  const [uncompletedPage, setUncompletedPage] = useState(1);
  const incompletePageSize = 5; 
  const completedPageSize = 5; 

  useEffect(() => {
    fetchTodos();
  }, [completedPage, uncompletedPage]);

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:4000/api/todos');
    setTodos(response.data);
  };

  const addTodo = async () => {
    await axios.post('http://localhost:4000/api/todos', { task });
    fetchTodos();
    setTask('');
  };

  const handleCheckboxChange = async (todo) => {
    await axios.put(`http://localhost:4000/api/todos/${todo._id}`, { completed: !todo.completed });
    fetchTodos();
  };

  useEffect(() => {
    const completedStartIndex = (completedPage - 1) * completedPageSize;
    const completedEndIndex = completedStartIndex + completedPageSize;
    setCompletedTodos(
      todos
        .filter((todo) => todo.completed && todo.task.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) // Sort by updatedAt in descending order
        .slice(completedStartIndex, completedEndIndex)
    );
  }, [todos, completedPage, searchTerm, completedPageSize]);

  const uncompletedStartIndex = (uncompletedPage - 1) * incompletePageSize;
  const uncompletedEndIndex = uncompletedStartIndex + incompletePageSize;
  const filteredIncompleteTodos = todos
    .filter((todo) => !todo.completed && todo.task.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) 
    .slice(uncompletedStartIndex, uncompletedEndIndex);

  return (
    <div className="todo-app">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div style={{ textAlign: 'center' }}>
            <Typography variant="h4">Todo List</Typography>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} className="add-todo">
            <TextField type="text" label="Add Todo" value={task} onChange={(e) => setTask(e.target.value)} />
            <Button variant="contained" onClick={addTodo}>
              Add Todo
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
        <TextField
          type="text"
          label="Search tasks"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
                </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} className="todos">
                <Typography variant="h6">Incomplete Tasks</Typography>
                {filteredIncompleteTodos.map((todo) => (
                  <div key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                    <Checkbox checked={todo.completed} onChange={() => handleCheckboxChange(todo)} />
                    <span>{todo.task}</span>
                  </div>
                ))}
                <div className="pagination">
                  <Button
                    variant="contained"
                    onClick={() => setUncompletedPage((prev) => prev - 1)}
                    disabled={uncompletedPage === 1}
                  >
                    Prev
                  </Button>
                  <span>{uncompletedPage}</span>
                  <Button
                    variant="contained"
                    onClick={() => setUncompletedPage((prev) => prev + 1)}
                    disabled={filteredIncompleteTodos.length < incompletePageSize}
                  >
                    Next
                  </Button>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} className="completed-tasks">
                <Typography variant="h6">Completed Tasks</Typography>
                {completedTodos.map((completedTodo) => (
                  <div key={completedTodo._id} className={`todo-item completed`}>
                    <Checkbox checked readOnly />
                    <span>{completedTodo.task}</span>
                  </div>
                ))}
                <div className="pagination">
                  <Button
                    variant="contained"
                    onClick={() => setCompletedPage((prev) => prev - 1)}
                    disabled={completedPage === 1}
                  >
                    Prev
                  </Button>
                  <span>{completedPage}</span>
                  <Button
                    variant="contained"
                    onClick={() => setCompletedPage((prev) => prev + 1)}
                    disabled={completedTodos.length < completedPageSize}
                  >
                    Next
                  </Button>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default TodoList;
