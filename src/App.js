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
      return todos.filter(todo => todo.id !== action.payload.id)   //   que hace esto
  }
}

//1. por que aca es solo name y no payload.name
const newTodo = (name)=>{
  return { id: Date.now(), name: name, complete: false }  // 2. por que creo acá el objeto con esas propiedades
}

const App = ()=>{

  const [todos, dispatch]= useReducer(reducer, [])
  const [name, setName] = useState('')

  const handleSubmit = (e)=> {
    e.preventDefault()
    dispatch ({type: ACTIONS.ADD_TODO, payload: { name: name } }) // 3. por qué el nombre {name: name}
    setName('')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={e => setName(e.target.value)}></input>
      </form>
      {todos.map(todo => {
        return <Todo key={todo.id} todo={todo} dispatch={dispatch} />    // por que es solo dispatch
      })}
    </>
  )
}

export default App