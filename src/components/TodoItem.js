import React from "react";

function TodoItem({ todo, handleEdit, toggleComplete, selectedTodos }) {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={selectedTodos.includes(todo.id)}
        onChange={() => toggleComplete(todo.id)}
      />
      <span>
        {todo.text} - <strong>Priority:</strong> {todo.priority}, <strong>Status:</strong> {todo.status}
      </span>
      
      <button onClick={() => handleEdit(todo)}>Edit</button>
    </li>
  );
}

export default TodoItem;
