import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './Telas/Home/Home';
import Login from './Telas/Login/Login';
import Cadastrar from './Telas/Cadastrar/Cadastrar';
import Menu from './Telas/Menu/Menu';
import EditarUsuario from './Telas/EditarUsuario/EditarUsuario';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/usuario/menu" element={<Menu />} />
        <Route path="/usuario/cadastro" element={<Cadastrar />} />
        <Route path="/usuario/editar" element={<EditarUsuario />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
