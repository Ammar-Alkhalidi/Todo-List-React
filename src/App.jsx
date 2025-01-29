import { useState } from "react";
import "./App.css";
import TaskItem from "./TaskItem";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState("");
  const [priority, setPriority] = useState("N");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedText = inputText.trim();

    if (!trimmedText) {
      setError(true);
      return;
    }
    setError(false);

    const newTask = {
      id: Date.now(),
      text: trimmedText,
      priority: priority,
      createdAt: new Date(),
      completed: false,
      completedAt: null,
    };

    setTasks([newTask, ...tasks]);
    setInputText("");
    setPriority("N");
  };

  const toggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              completedAt: task.completed ? null : new Date(),
            }
          : task
      )
    );
  };

  const handleDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleEditText = (taskId, newText) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, text: newText } : task
      )
    );
  };

  const handleEditPriority = (taskId, newPriority) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, priority: newPriority } : task
      )
    );
  };

  const formatDateTime = (date) => {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const setPriorityColor = (priority) => {
    if (priority === "H") return { color: "#ff4f4f" };
    if (priority === "N") return { color: "#ffd13f" };
    if (priority === "L") return { color: "#4affb1" };
    return {};
  };

  return (
    <main>
      <h1>Todo List</h1>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>Please enter your text 🗒</p>}

      {/* Form to Add Tasks */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          placeholder="Enter your task..."
          onChange={(e) => setInputText(e.target.value)}
        />

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="H">High</option>
          <option value="N">Normal</option>
          <option value="L">Low</option>
        </select>

        <button type="submit">Add Task</button>
      </form>

      {/* Task List */}
      <section>
        {tasks.length === 0 && <p>No tasks added yet!</p>}
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleComplete={toggleComplete}
            handleDelete={handleDelete}
            handleEditText={handleEditText}
            handleEditPriority={handleEditPriority}
            formatDateTime={formatDateTime}
            setPriorityColor={setPriorityColor}
          />
        ))}
      </section>
    </main>
  );
}

export default App;
