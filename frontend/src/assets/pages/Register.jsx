// frontend/src/pages/Register.jsx
import { useState } from "react";
import { createUser } from "../services/api";
import FormInput from "../components/FormInput";
import Footer from "../components/Footer";
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin } from "react-icons/fi";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    cpf: "",
    genero: "",
    dataNascimento: "",
    endereco: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!form.email.includes("@")) {
      setError("E-mail inválido");
      setLoading(false);
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("As senhas não coincidem");
      setLoading(false);
      return;
    }
    // Verificar que todos os campos estão preenchidos
    if (!form.name || !form.email || !form.password || !form.confirmPassword ||
        !form.cpf || !form.genero || !form.dataNascimento || !form.endereco) {
      setError("Preencha todos os campos");
      setLoading(false);
      return;
    }

    try {
      await createUser(form);
      // aqui você pode redirecionar ou exibir mensagem de sucesso...
    } catch {
      setError("Erro ao cadastrar usuário");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-auth min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="p-8 rounded-lg shadow-lg w-full max-w-md bg-transparent bg-opacity-70 space-y-4"
        >
          <h2 className="text-2xl font-georgia text-center text-white mb-4">
            Cadastro
          </h2>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <FormInput
            label="Nome"
            name="name"
            type="text"
            icon={<FiUser />}
            placeholder="Digite seu nome"
            value={form.name}
            onChange={handleChange}
          />

          <FormInput
            label="E-mail"
            name="email"
            type="email"
            icon={<FiMail />}
            placeholder="Digite seu e-mail"
            value={form.email}
            onChange={handleChange}
          />

          <FormInput
            label="Senha"
            name="password"
            type="password"
            icon={<FiLock />}
            placeholder="Digite sua senha"
            value={form.password}
            onChange={handleChange}
          />

          <FormInput
            label="Confirmar Senha"
            name="confirmPassword"
            type="password"
            icon={<FiLock />}
            placeholder="Confirme sua senha"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <FormInput
            label="CPF"
            name="cpf"
            type="text"
            icon={<FiPhone />}
            placeholder="000.000.000-00"
            value={form.cpf}
            onChange={handleChange}
          />

          <div>
            <label className="block text-white mb-1 font-semibold">Gênero</label>
            <select
              name="genero"
              value={form.genero}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white text-black"
              required
            >
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <FormInput
            label="Data de Nascimento"
            name="dataNascimento"
            type="date"
            placeholder="Selecione a data"
            value={form.dataNascimento}
            onChange={handleChange}
          />

          <FormInput
            label="Endereço"
            name="endereco"
            type="text"
            icon={<FiMapPin />}
            placeholder="Rua, número, bairro"
            value={form.endereco}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
