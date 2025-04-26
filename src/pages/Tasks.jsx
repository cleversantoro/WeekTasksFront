import { useEffect, useState } from "react";
import axios from "axios";
import "./Tasks.css";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  useEffect(() => {
    fetchTasks();
  }, []);
  const navigate = useNavigate();
  
  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:3000/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setTitle("");
    setDescription("");
    setStatus("");
    setShowModal(true);
  };

  const openEditModal = (task) => {
    setCurrentTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setIsEditing(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentTask(null);
  };

  const createTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:3000/tasks",
      { title, description, status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    closeModal();
    fetchTasks();
  };

  const updateTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:3000/tasks/${currentTask.id}`,
      { title, description, status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    closeModal();
    fetchTasks();
  };

  const deleteTask = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:3000/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  };

  const sortTasks = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    const sorted = [...tasks].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setTasks(sorted);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  return (
    <>
      <div className="top-actions">
        <h2>Minhas Tarefas</h2>
        <button className="add-btn" onClick={openCreateModal}>Adicionar Tarefa</button>
        <button className="logout-btn" onClick={handleLogout}>Sair</button>
      </div>

      <table className="task-table">
        <thead>
          <tr>
            <th onClick={() => sortTasks("title")}>Título {sortField === "title" ? (sortOrder === "asc" ? "↑" : "↓") : ""}</th>
            <th onClick={() => sortTasks("description")}>Descrição {sortField === "description" ? (sortOrder === "asc" ? "↑" : "↓") : ""}</th>
            <th onClick={() => sortTasks("status")}>Status {sortField === "status" ? (sortOrder === "asc" ? "↑" : "↓") : ""}</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>
                <div className="menu-icon">
                  <span onClick={() => openEditModal(task)}>✏️</span>&nbsp;
                  <span onClick={() => deleteTask(task.id)}>🗑️</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={number === currentPage ? "active-page" : ""}
          >
            {number}
          </button>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{isEditing ? "Editar Tarefa" : "Nova Tarefa"}</h3>
            <form onSubmit={isEditing ? updateTask : createTask}>
              <input
                className="task-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título da tarefa"
                required
              />
              <input
                className="task-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição"
              />
              <select
                className="task-input"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="">Selecione o status</option>
                <option value="pendente">Pendente</option>
                <option value="em progresso">Em progresso</option>
                <option value="concluído">Concluído</option>
              </select>
              <button className="add-btn" type="submit">{isEditing ? "Salvar Alterações" : "Criar Tarefa"}</button>
              <button className="add-btn cancel-btn" onClick={closeModal}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
