"use client"

import { useState } from "react"
import Button from "./Button"
import Card from "./Card"

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React hooks", completed: false },
    { id: 2, text: "Build a todo app", completed: true },
  ])
  const [inputValue, setInputValue] = useState("")
  const [filter, setFilter] = useState("all") // all, active, completed

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue.trim(),
          completed: false,
        },
      ])
      setInputValue("")
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
    return true
  })

  return (
    <Card title="My Todo List 📝">
      <div style={inputContainerStyle}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What needs to be done?"
          style={inputStyle}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
        />
        <Button onClick={addTodo} size="medium">
          Add Task
        </Button>
      </div>

      {/* Filter buttons with slightly inconsistent styling */}
      <div style={filterContainerStyle}>
        <button
          onClick={() => setFilter("all")}
          style={{
            ...filterButtonStyle,
            backgroundColor: filter === "all" ? "#3498db" : "#ecf0f1",
            color: filter === "all" ? "white" : "#2c3e50",
          }}
        >
          All ({todos.length})
        </button>
        <button
          onClick={() => setFilter("active")}
          style={{
            ...filterButtonStyle,
            backgroundColor: filter === "active" ? "#e67e22" : "#ecf0f1", // Different color
            color: filter === "active" ? "white" : "#2c3e50",
            marginLeft: "8px", // Slightly different spacing
          }}
        >
          Active ({todos.filter((t) => !t.completed).length})
        </button>
        <button
          onClick={() => setFilter("completed")}
          style={{
            ...filterButtonStyle,
            backgroundColor: filter === "completed" ? "#27ae60" : "#ecf0f1",
            color: filter === "completed" ? "white" : "#2c3e50",
            marginLeft: "10px", // Different spacing again
          }}
        >
          Done ({todos.filter((t) => t.completed).length})
        </button>
      </div>

      <ul style={todoListStyle}>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              ...todoItemStyle,
              backgroundColor: todo.completed ? "#f8f9fa" : "white",
            }}
          >
            <div style={todoContentStyle}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={checkboxStyle}
              />
              <span
                style={{
                  ...todoTextStyle,
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "#7f8c8d" : "#2c3e50",
                  opacity: todo.completed ? 0.7 : 1,
                }}
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>
            </div>
            <Button onClick={() => deleteTodo(todo.id)} variant="danger" size="small">
              🗑️
            </Button>
          </li>
        ))}
      </ul>

      {filteredTodos.length === 0 && (
        <div style={emptyStateStyle}>
          <p>
            {filter === "all"
              ? "🎉 No todos yet! Add one above."
              : filter === "active"
                ? "✅ All tasks completed!"
                : "📝 No completed tasks yet."}
          </p>
        </div>
      )}
    </Card>
  )
}

// Styles with intentional inconsistencies
const inputContainerStyle = {
  display: "flex",
  gap: "12px", // Slightly awkward gap
  marginBottom: "1.5rem",
  alignItems: "center",
}

const inputStyle = {
  flex: 1,
  padding: "0.7rem 1rem", // Slightly more padding than typical
  border: "2px solid #bdc3c7",
  borderRadius: "5px", // Different from button radius
  fontSize: "1rem",
  outline: "none",
  transition: "border-color 0.3s ease",
}

const filterContainerStyle = {
  marginBottom: "1.2rem",
  display: "flex",
  alignItems: "center",
}

const filterButtonStyle = {
  padding: "6px 12px", // Inconsistent with other buttons
  border: "none",
  borderRadius: "4px", // Different radius
  fontSize: "0.9rem",
  cursor: "pointer",
  transition: "all 0.2s ease",
}

const todoListStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
}

const todoItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0.8rem 1rem",
  margin: "0.5rem 0",
  border: "1px solid #e8e8e8",
  borderRadius: "6px",
  transition: "all 0.2s ease",
}

const todoContentStyle = {
  display: "flex",
  alignItems: "center",
  flex: 1,
}

const checkboxStyle = {
  marginRight: "12px",
  transform: "scale(1.2)", // Slightly larger checkbox
  cursor: "pointer",
}

const todoTextStyle = {
  fontSize: "1rem",
  cursor: "pointer",
  userSelect: "none",
}

const emptyStateStyle = {
  textAlign: "center",
  padding: "2rem",
  color: "#7f8c8d",
  fontStyle: "italic",
}

export default TodoList
