import { useState, useEffect } from "react";
import { updateUser, deleteUser } from "../services/api";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [newData, setNewData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:8800/users");
    const data = await response.json();
    setUsers(data);
    setLoading(false);
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setNewData({
      name: user.name,
      email: user.email,
      password: "",
      confirmPassword: "",
    });
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleUpdate = async () => {
    if (newData.password !== newData.confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      showPopup("As senhas não coincidem.", "error");
      return;
    }

    try {
      await updateUser(editingUser.id, newData);
      setSuccessMessage("Usuário alterado com sucesso!");
      showPopup("Usuário alterado com sucesso!", "success");
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      setErrorMessage("Erro ao atualizar o usuário.");
      showPopup("Erro ao atualizar o usuário.", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setSuccessMessage("Usuário excluído com sucesso!");
      showPopup("Usuário excluído com sucesso!", "success");
      fetchUsers();
    } catch (error) {
      setErrorMessage("Erro ao excluir o usuário.");
      showPopup("Erro ao excluir o usuário.", "error");
    }
  };

  // Função para mostrar o popup
  const showPopup = (message, type) => {
    setSuccessMessage(""); 
    setErrorMessage(""); 
    if (type === "success") {
      setSuccessMessage(message);
    } else {
      setErrorMessage(message);
    }
    setIsPopupVisible(true);
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 3000); 
  };

  return (
    <div className="bg-auth min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center">
        <div className="p-8 rounded-lg shadow-lg w-full max-w-4xl bg-transparent bg-opacity-70 backdrop-blur-lg">
          {loading ? (
            <p className="text-white text-center">Carregando...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <div>
              <h1 className="text-4xl text-black mb-6 text-center">
                Lista de Usuários
              </h1>
              <div className="overflow-x-auto">
                <table className="table-auto w-full text-black">
                  <thead>
                    <tr>
                      <th className="px-6 py-4 text-left text-xl">Nome</th>
                      <th className="px-6 py-4 text-left text-xl">E-mail</th>
                      <th className="px-6 py-4 text-left text-xl">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <tr key={user.id} className="border-b border-gray-300">
                          <td className="px-6 py-4 text-lg">{user.name}</td>
                          <td className="px-6 py-4 text-lg">{user.email}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleEditClick(user)}
                              className="mr-2 bg-yellow-500 px-4 py-2 text-white rounded"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="bg-red-500 px-4 py-2 text-white rounded"
                            >
                              Excluir
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center py-4 text-lg">
                          Nenhum usuário encontrado
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Modal de Edição */}
          {editingUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg">
                <h2 className="text-2xl text-white mb-4">Editar Usuário</h2>
                <input
                  type="text"
                  value={newData.name}
                  onChange={(e) =>
                    setNewData({ ...newData, name: e.target.value })
                  }
                  className="block w-full p-2 mb-2 text-black"
                  placeholder="Nome"
                />
                <input
                  type="email"
                  value={newData.email}
                  onChange={(e) =>
                    setNewData({ ...newData, email: e.target.value })
                  }
                  className="block w-full p-2 mb-2 text-black"
                  placeholder="E-mail"
                />
                <input
                  type="password"
                  value={newData.password}
                  onChange={(e) =>
                    setNewData({ ...newData, password: e.target.value })
                  }
                  className="block w-full p-2 mb-2 text-black"
                  placeholder="Senha"
                />
                <input
                  type="password"
                  value={newData.confirmPassword}
                  onChange={(e) =>
                    setNewData({ ...newData, confirmPassword: e.target.value })
                  }
                  className="block w-full p-2 mb-2 text-black"
                  placeholder="Confirmar Senha"
                />
                <div className="mt-4">
                  <button
                    onClick={handleUpdate}
                    className="bg-blue-500 px-4 py-2 text-white rounded mr-2"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => setEditingUser(null)}
                    className="bg-gray-500 px-4 py-2 text-white rounded"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Popup de Notificação */}
      {isPopupVisible && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-sm w-full text-center">
          <p className="text-xl font-semibold">
            {successMessage || errorMessage || "Mensagem padrão"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ListUsers;
