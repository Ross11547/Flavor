import { Route, Routes, Navigate } from "react-router-dom";
import { ROUTES } from "./enums/routes/Routes";
import Inicio from "./pages/private/inicio/index";
import Usuario from "./pages/private/usuario/index";
import Proveedor from "./pages/private/proveedores/index";
import Sucursal from "./pages/private/sucursal/index";
import Cliente from "./pages/private/clientes/index";
import Facturacion from "./pages/private/facturacion/index";
import Ventas from "./pages/private/ventas/index";
import Pedidos from "./pages/private/pedidos/index";
import Insumos from "./pages/private/insumos/index";
import Categoria from "./pages/private/categoria/index";
import Productos from "./pages/private/productos/index";
import Perfil from "./pages/private/perfil/index";
import Reportes from "./pages/private/reportes/index";
import Nav from './components/nav';  
import Login from "./pages/login";

const AppRoutes = () => {

  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login/>} />
      <Route path="/" element={<Nav />}>
        <Route path={ROUTES.DASHBOARD} element={<Inicio />} />
        <Route path={ROUTES.USUARIO} element={<Usuario />} />
        <Route path={ROUTES.PROVEEDOR} element={<Proveedor />} />
        <Route path={ROUTES.SUCURSAL} element={<Sucursal />} />
        <Route path={ROUTES.CLIENTE} element={<Cliente />} />
        <Route path={ROUTES.FACTURACION} element={<Facturacion />} />
        <Route path={ROUTES.VENTA} element={<Ventas />} />
        <Route path={ROUTES.PEDIDO} element={<Pedidos />} />
        <Route path={ROUTES.INSUMO} element={<Insumos />} />
        <Route path={ROUTES.CATEGORIA} element={<Categoria />} />
        <Route path={ROUTES.PRODUCTO} element={<Productos />} />
        <Route path={ROUTES.PERFIL} element={<Perfil />} />
        <Route path={ROUTES.REPORTES} element={<Reportes />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
