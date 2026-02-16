import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react';
import { TodoService } from './services/todoService';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';


function App() {

  const [todos,setTodos] = useState([]);
  const loadTodos = async()=>{
    const data = await TodoService.getTodos();
    setTodos(data);
  }

  useEffect(()=>{
    loadTodos();
  },[]);

  return(
    <div className="app">
      <h1>TODOER</h1>
      <h3>What do you want to do today?</h3>
      <br></br>
      <br></br>
      <TodoInput loadTodos={loadTodos}/>
      <TodoList todos={todos} loadTodos={loadTodos}/>
    </div>
  )
  
}

export default App
