import { useContext } from 'react'
import Home from './Layouts/Home'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Nav from './Components/Nav'
import ServiciosDetalles from './Components/ServiciosDetalles'
import ServiciosConteiner from './Components/ServiciosConteiner'
import Carrito from './Components/Carrito'
import Login from './Components/Login'
import ProductosConteiner from './Components/ProductosConteiner'
import Admin from './Components/Admin'
import OhanaBanner from './assets/IMG/OhanaBanner.jpg'
import Footer from './Components/Footer'
import Register from './Components/Register'
import AgregarProductos from './Components/AgregarProductos'
import { useAuthContext } from './context/AuthContext'
import CrearAdmin from './Components/CrearAdmin'
import EditarProducto from './Components/EditarProductos'
import Consultas from './Components/Consultas'

function App() {
  const { rol, user } = useAuthContext();

  return (
    <Router>
      <div id="root">
        <img src={OhanaBanner} alt="Banner Ohana" style={{ width: "100%", height: "auto%", display: "block" }} />
        <Nav />
          <div style={{ flex: 1 }}>
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/consultas" element={<Consultas/>}/>
              <Route path="/servicios" element={<ServiciosConteiner />} />
              <Route path="/productos" element={<ProductosConteiner />} />
              <Route path="/carrito" element={<Carrito usuarioLogeado={!!user} />} />
              <Route path="/productos/:id" element={<ServiciosDetalles />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={rol === "admin" ? <Admin /> : <Navigate to="/" />} />
              <Route path="/admin/agregarProductos" element={rol === "admin" ? <AgregarProductos /> : <Navigate to="/" />} />
              <Route path="/admin/crearAdmin" element={rol === "admin" ? <CrearAdmin /> : <Navigate to="/" />} />
              <Route path="/admin/editarProducto/:id" element={<EditarProducto />} />
            </Routes>
          </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;