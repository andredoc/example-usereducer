import React, { useState, useReducer } from 'react'
import Todo from './Todo.js'

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete-todo'
}

const reducer = (todos, action)=>{
  switch(action.type){
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)] 
    case ACTIONS.TOGGLE_TODO:
      return todos.map(todo => {
        if(todo.id === action.payload.id){
          return { ...todo, complete: !todo.complete }
        }
        return todo
      })
    case ACTIONS.DELETE_TODO:
      return todos.filter(todo => todo.id !== action.payload.id) 
  }
}

//crea objeto con sus propiedades
const newTodo = (data)=>{
  return { id: Date.now(), name: data, complete: false } 
}

const App = ()=>{

  const [todos, dispatch]= useReducer(reducer, [])
  const [name, setName] = useState('')

  console.log(todos)

  const handleSubmit = (e)=> {
    e.preventDefault()
    dispatch ({type: ACTIONS.ADD_TODO, payload: { name: name } }) // le puedo poner cualquier nombre a la propiedad pero SI le tengo que pasar name (useState)
    setName('')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={e => setName(e.target.value)}></input>
      </form>
      {todos.map(todo => {                                            // cuando cambia una prop o un estado se renderiza nuevamente. El "todos" sale del useReducer.
        return <Todo key={todo.id} todo={todo} dispatch={dispatch} />    
      })}
    </>
  )
}

export default App