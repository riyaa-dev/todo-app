import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:5000/api/todos");
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!text.trim()) return;
    await axios.post("http://localhost:5000/api/todos", { text });
    setText("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    fetchTodos();
  };

  const toggleTodo = async (id) => {
    await axios.patch(`http://localhost:5000/api/todos/${id}/toggle`);
    fetchTodos();
  };

  return (
    <div>
    <div
      style={{
        width: "400px",
        margin: "auto",
        marginTop: "50px",
        padding: "20px",
        background: "#f1f1f1",
        borderRadius: "10px",
        color: "#000", // Set overall text color to black
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333" }}>Todo App</h2>
  
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Add a new todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            flex: 1,
            padding: "5px",
            color: "#000", // Input text color
            backgroundColor: "#333", // Dark input background
            border: "none",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={addTodo}
          style={{
            marginLeft: "10px",
            padding: "5px 10px",
            backgroundColor: "#007bff",
            color: "#fff", // Button text color
            border: "none",
            borderRadius: "4px",
          }}
        >
          Add
        </button>
      </div>
  
      {todos.map((todo) => (
        <div
          key={todo._id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "8px 0",
            alignItems: "center",
          }}
        >
          <div style={{ color: "#000" }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo._id)}
            />
            <span
              style={{
                marginLeft: "8px",
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
          </div>
          <button
            onClick={() => deleteTodo(todo._id)}
            style={{
              backgroundColor: "#111",
              color: "red",
              padding: "5px 10px",
              borderRadius: "4px",
              border: "none",
            }}
          >
            Delete
          </button>
        </div>
      ))}
  
      <p style={{ textAlign: "center", color: "#555" }}>
        {todos.filter((t) => !t.completed).length} todo remaining
      </p>
  
      <div style={{ textAlign: "center" }}>
        <button
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "8px 16px",
            borderRadius: "5px",
            border: "none",
          }}
        >
          Logout
        </button>
      </div>
    </div>
    </div>
  )};
  
  


export default App;


