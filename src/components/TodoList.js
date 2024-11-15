import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, handleEdit, toggleComplete, selectedTodos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleEdit={handleEdit}
          toggleComplete={toggleComplete}
          selectedTodos={selectedTodos}
        />
      ))}
    </ul>
  );
}

export default TodoList;
