// Format of react files: imports, hooks, helper function, return component
import { useState } from 'react'
import { useEffect } from 'react'
import "./styles.css"
import { NewTodoForm } from './NewTodoForm'
import { TodoList} from './TodoList'


// In React, function with Capital letter is a component (returns HTML)
export default function App() { 
  // states are immutable (cannot do newItem = ...)
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  }) // js destructuring syntax

  // NOTE: cannot render hooks conditionally (inside if/else, while/for, after returns)
  // ALWAYS put hooks at top of the file
  // Run every time the 2ns param object inside changes
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {
    setTodos(currentTodos => { // Pass in function param so if want to setTodos twice, it actually adds 2 values to array instead of rewriting the first value
      return [
        ...currentTodos, // ... is spread operator containing all existing array values (aka the "current" currentTodos)
        { id: crypto.randomUUID(), title, completed: false }
      ]
    }) 
  }

  function toggleTodo(id, completed) { // set array value with given id to given completion status
    setTodos(currentTodos=> {
      return currentTodos.map(todo => {
        if (todo.id == id) {
          return { ...todo, completed}
        }
        return todo // if id not found, no change to todo array
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id != id) // keep every value that isn't given id
    })
  }

  // class is reserved keyword in react
  // function can only export one element (wrap everything in fragment, not div)

  // Use onChange Event Listener to handle any time an input is changed (onChange is called everytime key is clicked, don't do onInput)
  // Ex: <input ... value = {newItem} onChange={e => setNewItem(e.target.value)} /> 
  // onChange={e => setNewItem(e.target.value) sets up event listener for change in input
  // any change in input changes the state of newItem (aka value of input when it rerenders)
  // onSubmit is another event listener for forms 

  //Everything inside {} is run as js code
  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">To Do List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </>

  ) // For react: each elem in array has key identifer (unique id)
    // todos.map above iterates through each element in todos array and applies the formatting in the return statement
}   // pass functions into event handlers so you don't return the result of the function called (instead of applying to function)

