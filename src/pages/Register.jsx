import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Vamos criar também esse CSS estiloso!

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:3000/auth/register", { name, email, password });
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Erro ao registrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Crie sua conta 🚀</h2>
        <p className="subtitle">Registre-se para começar</p>

        {error && <div className="error-message">{error}</div>}

        <input
          className="register-input"
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="register-input"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="register-input"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="register-button" type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrar"}
        </button>

        <div className="register-footer">
          <small>Já tem uma conta? <a href="/">Entrar</a></small>
        </div>
      </form>
    </div>
  );
}
