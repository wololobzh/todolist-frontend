import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    api.get("/").then((res) => setTodos(res.data));
  }, []);

  const addTodo = async () => {
    if (!text.trim()) return;
    const res = await api.post("/", { text });
    setTodos([...todos, res.data]);
    setText("");
  };

  const toggleTodo = async (id) => {
    await api.put(`/${id}`);
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTodo = async (id) => {
    await api.delete(`/${id}`);
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nouvelle tâche"
          style={{ flex: 1 }}
        />
        <button onClick={addTodo}>Ajouter</button>
      </div>
      <ul>
        {
        todos.map((t) => (
          <li key={t.id} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span
              style={{ textDecoration: t.done ? "line-through" : "none", cursor: "pointer", flex: 1 }}
              onClick={() => toggleTodo(t.id)}
              title="Cliquer pour cocher/décocher"
            >
              {t.text}
            </span>
            <button onClick={() => deleteTodo(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </>
  );
}
