import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/tasks");
    } catch{
      alert("Erro ao fazer login");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleLogin}>
        <h2 className="text-2xl mb-4">Login</h2>
        <input className="border p-2 w-full mb-2" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
        <input className="border p-2 w-full mb-4" type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-blue-500 text-white p-2 w-full">Entrar</button>
      </form>
    </div>
  );
}
