import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Vamos criar também esse CSS bonito

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/tasks");
    } catch (err) {
      console.error(err);
      setError("E-mail ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Bem-vindo de volta 👋</h2>
        <p className="subtitle">Entre para continuar</p>

        {error && <div className="error-message">{error}</div>}

        <input
          className="login-input"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button" type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <div className="login-footer">
          <small>Esqueceu sua senha? <a href="#">Recuperar</a></small>
          <br />
          <small>Não tem uma conta? <a href="/register">Registrar</a></small>
        </div>
      </form>
    </div>
  );
}
