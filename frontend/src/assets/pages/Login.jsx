import { useState } from "react";
import { loginUser } from "../services/api"; 
import FormInput from "../components/FormInput"; 
import Footer from "../components/Footer"; 
import { useNavigate } from "react-router-dom"; 

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const userData = {
        email: form.email,
        password: form.password,
      };
  
      console.log("Dados do login:", userData); 
  
      const loggedInUser = await loginUser(userData);
      console.log("Usuário logado:", loggedInUser);

      // Se o login for bem-sucedido, redireciona para a página de listar usuários
      if (loggedInUser.token) {
        localStorage.setItem("token", loggedInUser.token);  // Salvar o token no localStorage
        navigate("/listar-usuarios");  // Redireciona para a página de listar usuários
      }
    } catch (error) {
      setError("Erro ao realizar o login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-auth min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center">
        <div className="p-8 rounded-lg shadow-lg w-full max-w-md bg-transparent bg-opacity-70">
          <h2 className="text-2xl font-georgia text-center mb-4 text-white">Login</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              label="E-mail"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
              className="font-avenirLight placeholder-gray-400"
            />
            <FormInput
              label="Senha"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Digite sua senha"
              className="font-avenirLight placeholder-gray-400"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition font-avenir"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
