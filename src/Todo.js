import { ACTIONS } from './App'

const Todo = ( {todo, dispatch} )=>{
  return (
    <>
      <span style={{ color: todo.complete ? '#AAA' : '#000' }}>
        {todo.name}
      </span>
      <button onClick={()=> dispatch({ type: ACTIONS.TOGGLE_TODO, payload: {id: todo.id}})}>
        Toggle {todo.id}
      </button>
      <button onClick={()=> dispatch({ type: ACTIONS.DELETE_TODO, payload: {id: todo.id}})}>
        Delete
      </button>
    </>
  )
}

export default Todo;