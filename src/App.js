// App.js
import React, { useState } from "react";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("To Do");
  const [selectedTodos, setSelectedTodos] = useState([]);

  const handleChange = (e) => setInputValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      if (isEditing) {
        setTodos(
          todos.map((todo) =>
            todo.id === currentTodo.id
              ? { ...todo, text: inputValue, status, priority }
              : todo
          )
        );
        setIsEditing(false);
        setCurrentTodo(null);
      } else {
        setTodos([
          ...todos,
          {
            id: Date.now(),
            text: inputValue,
            completed: false,
            status,
            priority,
          },
        ]);
      }
      setInputValue("");
      setPriority("Medium");
      setStatus("To Do");
    }
  };

  const handleEdit = (todo) => {
    setIsEditing(true);
    setCurrentTodo(todo);
    setInputValue(todo.text);
    setPriority(todo.priority);
    setStatus(todo.status);
  };

  const toggleComplete = (id) => {
    setSelectedTodos((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((todoId) => todoId !== id)
        : [...prevSelected, id]
    );
  };

  const handleBulkDelete = () => {
    setTodos(todos.filter((todo) => !selectedTodos.includes(todo.id)));
    setSelectedTodos([]);
  };

  return (
    <div className="app-container">
      <h1>Daily My Todo List</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Enter a task"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="priority-select"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="status-select"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <button type="submit">{isEditing ? "Update Todo" : "Add Todo"}</button>
      </form>

      <button onClick={handleBulkDelete} disabled={selectedTodos.length === 0}>
        Delete Selected
      </button>

      <TodoList
        todos={todos}
        handleEdit={handleEdit}
        toggleComplete={toggleComplete}
        selectedTodos={selectedTodos}
      />
    </div>
  );
}

export default App;
