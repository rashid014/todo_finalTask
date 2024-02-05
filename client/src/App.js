import React,{useEffect,useState} from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import TodoList from '../src/Components/todoList'
import './App.css'


function App() {

  return (
    
       <Router>
    <Routes>
    <Route exact path="/"  element={<TodoList/>}/>
  
    
    </Routes>
   </Router>
 
  
  )
}

export default App