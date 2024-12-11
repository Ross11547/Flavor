import React from "react";
import Login from "./views/login";
import Nav from "./views/private/nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Usuario from "./views/private/usuario/usuario";
import Producto from "./views/producto";
import Compra from "./views/compra";
import Almacen from "./views/almacen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegistroIngresos from "./views/registroIngreso";
import Tareas from "./views/tareas";
import { UserProvider } from "./context/useContext";
import Proveedor from "./views/private/proveedor";
import Sucursal from "./views/private/sucursal";
import Cliente from "./views/private/cliente";
import Categoria from "./views/private/categoria";
import Insumo from "./views/private/insumo";
import Perfil from "./views/private/perfil";
import Venta from "./views/private/ventas";
import Factura from "./views/private/factura";
import Pedido from "./views/private/pedidos";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/" element={<Nav />}>
            <Route path="/usuarios" element={<Usuario />} />
            <Route path="/proveedores" element={<Proveedor />} />
            <Route path="/sucursales" element={<Sucursal />} />
            <Route path="/clientes" element={<Cliente />} />
            <Route path="/categorias" element={<Categoria />} />
            <Route path="/insumos" element={<Insumo />} />
            <Route path="/ventas" element={<Venta />} />
            <Route path="/facturas" element={<Factura />} />
            <Route path="/pedidos" element={<Pedido />} />

            <Route path="/productos" element={<Producto />} />
            <Route path="/compras" element={<Compra />} />
            <Route path="/almacen" element={<Almacen />} />
            <Route path="/tareas" element={<Tareas />} />
            <Route path="/ingresos" element={<RegistroIngresos />} />
            <Route path="/perfil" element={<Perfil />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
