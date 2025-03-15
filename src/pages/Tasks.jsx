import { useEffect, useState } from "react";
import axios from "axios";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:3000/tasks", { headers: { Authorization: `Bearer ${token}` } });
    setTasks(res.data);
  };

  const createTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:3000/tasks", { title }, { headers: { Authorization: `Bearer ${token}` } });
    setTitle("");
    fetchTasks();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Minhas Tarefas</h2>
      <form onSubmit={createTask} className="mb-4">
        <input className="border p-2 mr-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nova tarefa" />
        <button className="bg-blue-500 text-white p-2">Criar</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="border p-2 mb-2">{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
