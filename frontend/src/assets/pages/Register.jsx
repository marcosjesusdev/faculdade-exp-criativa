import { useState } from "react";
import { createUser } from "../services/api"; // Importando o serviço
import FormInput from "../components/FormInput";
import Footer from "../components/Footer";
import { FiUser, FiMail, FiLock } from "react-icons/fi"; // Ícones
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Ícones para mostrar/ocultar a senha

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // Controle da visibilidade da senha
  const [passwordsMatch, setPasswordsMatch] = useState(true); // Controle se as senhas coincidem
  const [emailValid, setEmailValid] = useState(true); // Controle se o e-mail é válido

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => {
      const updatedForm = { ...prevForm, [name]: value };

      // Verificando se as senhas são iguais em tempo real
      if (name === "password" || name === "confirmPassword") {
        setPasswordsMatch(updatedForm.password === updatedForm.confirmPassword);
      }

      // Verificando se o e-mail contém "@" em tempo real
      if (name === "email") {
        setEmailValid(value.includes("@"));
      }

      return updatedForm;
    });
  };

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Verificação final se o email tem "@"
    if (!form.email.includes("@")) {
      setEmailValid(false);
      setLoading(false);
      return;
    }

    if (!passwordsMatch) {
      setError("As senhas não coincidem!");
      setLoading(false);
      return;
    }

    try {
      const userData = {
        name: form.name,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
      };

      const newUser = await createUser(userData);
      console.log("Usuário criado:", newUser);
    } catch (error) {
      setError("Erro ao criar o usuário. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-auth min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center">
        <div className="p-8 rounded-lg shadow-lg w-full max-w-md bg-transparent bg-opacity-70">
          <h2 className="text-2xl font-georgia text-center mb-4 text-white">Cadastro</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              label="Nome"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Digite seu nome"
              icon={<FiUser />}
              className="font-avenirLight placeholder-gray-400"
            />
            <FormInput
              label="E-mail"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
              icon={<FiMail />}
              className={`font-avenirLight placeholder-gray-400 ${!emailValid ? 'border-red-500' : ''}`}
            />
            {!emailValid && <p className="text-red-500 text-sm">O e-mail precisa conter '@'.</p>}
            <FormInput
              label="Senha"
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Digite sua senha"
              icon={<FiLock />}
              className="font-avenirLight placeholder-gray-400"
            />
            <FormInput
              label="Confirmar Senha"
              type={passwordVisible ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirme sua senha"
              icon={<FiLock />}
              className={`font-avenirLight placeholder-gray-400 ${!passwordsMatch ? 'border-red-500' : ''}`}
            />
            {!passwordsMatch && <p className="text-red-500 text-sm">As senhas não coincidem</p>}

            <div className="relative flex items-center justify-between">
              <button
                type="button"
                onClick={handlePasswordToggle}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition font-avenir"
              disabled={loading}
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
