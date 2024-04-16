import { TodoItem } from "./TodoItem"

export function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <ul className="list">
      {todos.length === 0 && "No Todos (this js syntax is called short circuiting"}
      {todos.map((todo) => {
        return (
            <TodoItem {...todo} 
            key={todo.id} 
            toggleTodo={toggleTodo} 
            deleteTodo={deleteTodo}/>
            //id={todo.id} completed={todo.completed} title={todo.title} key={todo.id} /> // need key for array
        )
      })}
    </ul>
  );
}
