import React, { useState } from 'react';
import { Colors } from '../style/colors';
import { ROUTES } from '../enums/routes/Routes';
import { BottonNav, Button, ContainerPadre, DivButtonNav, DivOutlet, Icon, Icons, ImgLetra, NavContainer, NavHeader, NavItem, ParentIcon, ScrollContainer, SubMenu } from '../style/navStyled'; // Añadir SubMenu y SubMenuItem
import { FaAngleDown, FaAngleUp, FaBoxOpen, FaHome, FaUserCircle } from "react-icons/fa";
import { FaBagShopping, FaMoneyCheckDollar, FaUsers } from "react-icons/fa6";
import { MdInsertChart, MdSettings, MdShoppingCart } from "react-icons/md";
import { IoIceCream, IoLogOut, IoStorefrontSharp } from "react-icons/io5";
import { RiMenuFold2Fill, RiMenuFold3Fill, RiMenuFold4Fill, RiMenuFoldFill, RiTruckFill } from "react-icons/ri";
import { PiFilesFill } from "react-icons/pi";
import { MdPeopleAlt } from "react-icons/md";
import { HiPhone } from "react-icons/hi2";
import imgLetra from '../assets/img/logoletra.png';
import { Outlet } from 'react-router-dom';

const Nav = () => {
  const [isSalesMenuOpen, setSalesMenuOpen] = useState(false);
  const [isProductMenuOpen, setProductMenuOpen] = useState(false);
  const [isContactoMenuOpen, setContactoMenuOpen] = useState(false);
  const [isConfigMenuOpen, setConfigMenuOpen] = useState(false);
  const [isNavRead, setisNavRead] = useState(false);

  const toggleSalesMenu = () => {
    setSalesMenuOpen(!isSalesMenuOpen);
  };

  const toggleProductMenu = () => {
    setProductMenuOpen(!isProductMenuOpen);
  };

  const toggleContactoMenu = () => {
    setContactoMenuOpen(!isContactoMenuOpen);
  };

  const toggleConfiMenu = () => {
    setConfigMenuOpen(!isConfigMenuOpen);
  };

  const navRead = () => {
    setisNavRead(!isNavRead);
  };

  return (
    <>
       <DivButtonNav visible={isNavRead}>
        <BottonNav onClick={navRead}>{isNavRead ? <RiMenuFoldFill /> : <RiMenuFold2Fill />}</BottonNav>
      </DivButtonNav> 
      <ContainerPadre visible={navRead}>
        <NavContainer visible={navRead} >
          <NavHeader>
            <ImgLetra src={imgLetra} alt="" />
          </NavHeader>
          <ScrollContainer>
            <NavItem to={ROUTES.DASHBOARD} theme={Colors}>
              <Icon><FaHome /></Icon> Inicio
            </NavItem>

            <NavItem theme={Colors} onClick={toggleContactoMenu}>
              <Icon><HiPhone /></Icon> Contactos
              <ParentIcon>
                {isContactoMenuOpen ? <FaAngleUp /> : <FaAngleDown />}
              </ParentIcon>
            </NavItem>
            {isContactoMenuOpen && (
              <SubMenu>
                <NavItem to={ROUTES.USUARIO} theme={Colors}>
                  <Icon><FaUsers /></Icon> Usuarios
                </NavItem>
                <NavItem to={ROUTES.PROVEEDOR} theme={Colors}>
                  <Icon><RiTruckFill /></Icon> Proveedor
                </NavItem>
                <NavItem to={ROUTES.SUCURSAL} theme={Colors}>
                  <Icon><IoStorefrontSharp /></Icon> Sucursales
                </NavItem>
              </SubMenu>
            )}

            <NavItem theme={Colors} onClick={toggleSalesMenu}>
              <Icon><FaBagShopping /></Icon> Ventas
              <ParentIcon>
                {isSalesMenuOpen ? <FaAngleUp /> : <FaAngleDown />}
              </ParentIcon>
            </NavItem>
            {isSalesMenuOpen && (
              <SubMenu>
                <NavItem to={ROUTES.CLIENTE} theme={Colors}>
                  <Icon><MdPeopleAlt /></Icon> Clientes
                </NavItem>
                <NavItem to={ROUTES.FACTURACION} theme={Colors}>
                  <Icon><FaMoneyCheckDollar /></Icon> Facturación
                </NavItem>
                <NavItem to={ROUTES.VENTA} theme={Colors}>
                  <Icon><FaBagShopping /></Icon> Ventas
                </NavItem>
                <NavItem to={ROUTES.PEDIDO} theme={Colors}>
                  <Icon><MdShoppingCart /></Icon> Pedidos
                </NavItem>
              </SubMenu>
            )}

            <NavItem theme={Colors} onClick={toggleProductMenu}>
              <Icon><IoIceCream /></Icon> Productos
              <ParentIcon>
                {isProductMenuOpen ? <FaAngleUp /> : <FaAngleDown />}
              </ParentIcon>
            </NavItem>
            {isProductMenuOpen && (
              <SubMenu>
                <NavItem to={ROUTES.INSUMO} theme={Colors}>
                  <Icon><FaBoxOpen /></Icon> Insumos
                </NavItem>
                <NavItem to={ROUTES.CATEGORIA} theme={Colors}>
                  <Icon><PiFilesFill /></Icon> Categorías
                </NavItem>
                <NavItem to={ROUTES.PRODUCTO} theme={Colors}>
                  <Icon><IoIceCream /></Icon> Productos
                </NavItem>
              </SubMenu>
            )}

            <NavItem theme={Colors} onClick={toggleConfiMenu}>
              <Icon><MdSettings /></Icon> Configuracion
              <ParentIcon>
                {isConfigMenuOpen ? <FaAngleUp /> : <FaAngleDown />}
              </ParentIcon>
            </NavItem>
            {isConfigMenuOpen && (
              <SubMenu>
                <NavItem to={ROUTES.PERFIL} theme={Colors}>
                  <Icon><FaUserCircle /></Icon> Perfil
                </NavItem>
                <Button><Icons><IoLogOut /></Icons>Salir</Button>
              </SubMenu>
            )}
            <NavItem to={ROUTES.REPORTES} theme={Colors}>
              <Icon><MdInsertChart /></Icon> Reportes
            </NavItem>
          </ScrollContainer>
        </NavContainer>
        <DivOutlet>
          <Outlet />
        </DivOutlet>
      </ContainerPadre>
    </>
  );
};

export default Nav;
