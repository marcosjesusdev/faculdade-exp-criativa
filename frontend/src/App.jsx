import React from "react";
import Header from "./assets/components/Header";
import Footer from "./assets/components/Footer"; // Caminho correto
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./assets/pages/Register"; // Caminho correto
import Login from "./assets/pages/Login";
import ListUsers from "./assets/pages/ListUsers"; // Página para listar os usuários

const App = () => {
  return (
    <div className="bg-transparent">
      <Router> {/* Mantenha o Router aqui */}
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/listar-usuarios" element={<ListUsers />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
