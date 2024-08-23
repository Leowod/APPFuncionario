import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Telas/Home/Home';
import Login from './Telas/Login/Login';
import Cadastrar from './Telas/Cadastrar/Cadastrar';
import Menu from './Telas/Menu/Menu';
import EditarUsuario from './Telas/EditarUsuario/EditarUsuario';
import RestaurarUsuario from './Telas/RestaurarUsuario/RestaurarUsuario';
import PerfilUsuario from './Telas/PerfilUsuario/PerfilUsuario';
import Holerites from './Telas/Holerites/Holerites';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usuario/menu" element={<Menu />} />
        <Route path="/usuario/cadastro" element={<Cadastrar />} />
        <Route path="/usuario/holerites" element={<Holerites />} />
        <Route path="/usuario/restaurar" element={<RestaurarUsuario />} />
        <Route path="/usuario/editar" element={<EditarUsuario />} />
        <Route path="/usuario/perfil" element={<PerfilUsuario />} />
      </Routes>
    </Router>
  );
}

export default App;
