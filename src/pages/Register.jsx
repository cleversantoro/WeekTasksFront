import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/auth/register", { name, email, password });
      navigate("/");
    } catch {
      alert("Erro ao registrar");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleRegister}>
        <h2 className="text-2xl mb-4">Registro</h2>
        <input className="border p-2 w-full mb-2" placeholder="Nome" onChange={(e) => setName(e.target.value)} />
        <input className="border p-2 w-full mb-2" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
        <input className="border p-2 w-full mb-4" type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-green-500 text-white p-2 w-full">Registrar</button>
      </form>
    </div>
  );
}
