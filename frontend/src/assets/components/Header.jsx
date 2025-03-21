import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="p-4 fixed w-full bg-transparent text-white font-avenir">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Usando font-georgia para o título "Meu App" */}
        <h1 className="text-2xl font-georgia font-bold">Meu App</h1>

        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/register" className="hover:text-blue-300 font-georgia font-bold">
                Cadastro
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-blue-300 font-georgia font-bold">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
