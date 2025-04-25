import { useState, useEffect } from "react";
import { updateUser, deleteUser } from "../services/api";
import Footer from "../components/Footer";

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
    cpf: "",
    genero: "",
    dataNascimento: "",
    endereco: "",
  });

  const [selectedUser, setSelectedUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8800/users?page=${page}&limit=${usersPerPage}`
      );
      const data = await res.json();
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch {
      setError("Erro ao buscar usuários");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handleEditClick = (user) => {
    setEditingUser(user);
    setNewData({
      name: user.name,
      email: user.email,
      password: "",
      confirmPassword: "",
      cpf: user.cpf,
      genero: user.genero,
      dataNascimento: user.dataNascimento,
      endereco: user.endereco,
    });
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleUpdate = async () => {
    if (newData.password !== newData.confirmPassword) {
      showPopup("As senhas não coincidem.", "error");
      return;
    }
    try {
      await updateUser(editingUser.id, newData);
      showPopup("Usuário alterado com sucesso!", "success");
      setEditingUser(null);
      fetchUsers(currentPage);
    } catch {
      showPopup("Erro ao atualizar o usuário.", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      showPopup("Usuário excluído com sucesso!", "success");
      fetchUsers(currentPage);
    } catch {
      showPopup("Erro ao excluir o usuário.", "error");
    }
  };

  const showPopup = (message, type) => {
    setSuccessMessage("");
    setErrorMessage("");
    type === "success"
      ? setSuccessMessage(message)
      : setErrorMessage(message);
    setIsPopupVisible(true);
    setTimeout(() => setIsPopupVisible(false), 3000);
  };

  return (
    <div className="bg-auth min-h-screen flex flex-col">
      {/* Conteúdo principal */}
      <div className="flex-grow flex items-center justify-center">
        <div className="p-8 rounded-lg shadow-lg w-full max-w-5xl bg-transparent bg-opacity-70 backdrop-blur-lg">
          {loading ? (
            <p className="text-white text-center">Carregando...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <>
              <h1 className="text-4xl text-black mb-6 text-center">
                Lista de Usuários
              </h1>
              {/* Tabela */}
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
                      users.map((u) => (
                        <tr key={u.id} className="border-b border-gray-300">
                          <td className="px-6 py-4 text-lg">{u.name}</td>
                          <td className="px-6 py-4 text-lg">{u.email}</td>
                          <td className="px-6 py-4 space-x-2">
                            <button
                              onClick={() => handleEditClick(u)}
                              className="bg-yellow-500 px-4 py-2 text-white rounded"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(u.id)}
                              className="bg-red-500 px-4 py-2 text-white rounded"
                            >
                              Excluir
                            </button>
                            <button
                              onClick={() => setSelectedUser(u)}
                              className="bg-blue-500 px-4 py-2 text-white rounded"
                            >
                              Detalhes
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="3"
                          className="text-center py-4 text-lg text-black"
                        >
                          Nenhum usuário encontrado
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.max(p - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
                  >
                    Anterior
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded ${
                          page === currentPage
                            ? "bg-blue-600 text-white"
                            : "bg-gray-300 text-black"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
                  >
                    Próxima
                  </button>
                </div>
              )}
            </>
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
                    setNewData({
                      ...newData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="block w-full p-2 mb-2 text-black"
                  placeholder="Confirmar Senha"
                />
                <input
                  type="text"
                  value={newData.cpf}
                  onChange={(e) =>
                    setNewData({ ...newData, cpf: e.target.value })
                  }
                  className="block w-full p-2 mb-2 text-black"
                  placeholder="CPF"
                />
                <select
                  value={newData.genero}
                  onChange={(e) =>
                    setNewData({ ...newData, genero: e.target.value })
                  }
                  className="block w-full p-2 mb-2 text-black"
                >
                  <option value="">Selecione o Gênero</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                </select>
                <input
                  type="date"
                  value={newData.dataNascimento}
                  onChange={(e) =>
                    setNewData({ ...newData, dataNascimento: e.target.value })
                  }
                  className="block w-full p-2 mb-2 text-black"
                />
                <input
                  type="text"
                  value={newData.endereco}
                  onChange={(e) =>
                    setNewData({ ...newData, endereco: e.target.value })
                  }
                  className="block w-full p-2 mb-2 text-black"
                  placeholder="Endereço"
                />
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={handleUpdate}
                    className="bg-blue-500 px-4 py-2 text-white rounded"
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

          {/* Modal de Detalhes */}
          {selectedUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Detalhes do Usuário</h2>
                <p>
                  <strong>Nome:</strong> {selectedUser.name}
                </p>
                <p>
                  <strong>E-mail:</strong> {selectedUser.email}
                </p>
                <p>
                  <strong>CPF:</strong> {selectedUser.cpf}
                </p>
                <p>
                  <strong>Gênero:</strong> {selectedUser.genero}
                </p>
                <p>
                  <strong>Data de Nascimento:</strong>{" "}
                  {new Date(selectedUser.dataNascimento).toLocaleDateString()}
                </p>
                <p>
                  <strong>Endereço:</strong> {selectedUser.endereco}
                </p>
                <p>
                  <strong>Criado em:</strong>{" "}
                  {new Date(selectedUser.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Atualizado em:</strong>{" "}
                  {new Date(selectedUser.updatedAt).toLocaleString()}
                </p>
                <div className="mt-4 text-right">
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="bg-gray-500 px-4 py-2 text-white rounded"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ListUsers;
