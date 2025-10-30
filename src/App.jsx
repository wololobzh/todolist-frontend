import TodoList from "./components/TodoList";

export default function App() {
  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>📝 Ma TodoList</h1>
      <TodoList />
    </div>
  );
}
