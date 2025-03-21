import { useState, useEffect } from "react";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Estado para armazenar erros

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8800/users'); // URL ajustada para refletir o caminho correto
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data); // Armazena os usuários no estado
        setLoading(false); // Atualiza o estado para indicar que os dados foram carregados
      } catch (error) {
        console.error('Erro ao buscar os usuários:', error);
        setError("Erro ao buscar os usuários"); // Define a mensagem de erro
        setLoading(false); // Garante que a tela de carregamento desapareça em caso de erro
      }
    };

    fetchUsers();
  }, []); // O array vazio garante que a requisição seja feita uma única vez

  return (
    <div className="bg-auth min-h-screen flex flex-col"> {/* Usando o fundo e estrutura */}
      <div className="flex-grow flex items-center justify-center">
        <div className="p-8 rounded-lg shadow-lg w-full max-w-4xl bg-transparent bg-opacity-70 backdrop-blur-lg"> {/* Aplicando o blur aqui */}
          {loading ? (
            <p className="text-white text-center">Carregando...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p> // Exibe a mensagem de erro se houver um
          ) : (
            <div>
              <h1 className="text-4xl text-black mb-6 text-center">Lista de Usuários</h1> {/* Título sem negrito, e com texto preto */}
              <div className="overflow-x-auto">
                <table className="table-auto w-full text-black"> {/* Letras pretas na tabela */}
                  <thead>
                    <tr>
                      <th className="px-6 py-4 text-left text-xl">Nome</th> {/* Coluna sem negrito */}
                      <th className="px-6 py-4 text-left text-xl">E-mail</th> {/* Coluna sem negrito */}
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <tr key={user.id} className="border-b border-gray-300">
                          <td className="px-6 py-4 text-lg">{user.name}</td> {/* Sem negrito */}
                          <td className="px-6 py-4 text-lg">{user.email}</td> {/* Sem negrito */}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="text-center py-4 text-lg">Nenhum usuário encontrado</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListUsers;
