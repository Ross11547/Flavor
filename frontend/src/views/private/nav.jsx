import React, { useState } from "react";
import styled from "styled-components";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Truck,
  Store,
  User,
  Package,
  ShoppingCart,
  FileText,
  Archive,
  Settings,
  LogOut,
  IceCream,
  List,
  Contact,
  BarChart,
  ChevronDown,
} from "lucide-react";

const menuItems = [
  {
    title: "Inicio",
    icon: Home,
    path: "/inicio",
  },
  {
    title: "Contactos",
    icon: Users,
    subItems: [
      { title: "Usuarios", icon: User, path: "/usuarios" },
      { title: "Proveedores", icon: Truck, path: "/proveedores" },
      { title: "Sucursales", icon: Store, path: "/sucursales" },
    ],
  },
  {
    title: "Ventas",
    icon: ShoppingCart,
    subItems: [
      { title: "Clientes", icon: Users, path: "/clientes" },
      { title: "Facturas", icon: FileText, path: "/facturas" },
      { title: "Ventas", icon: ShoppingCart, path: "/ventas" },
      { title: "Pedidos", icon: List, path: "/pedidos" },
    ],
  },
  {
    title: "Productos",
    icon: Package,
    subItems: [
      { title: "Insumos", icon: Archive, path: "/insumos" },
      { title: "Categorías", icon: List, path: "/categorias" },
      { title: "Productos", icon: Package, path: "/productos" },
    ],
  },
  {
    title: "Configuración",
    icon: Settings,
    subItems: [
      { title: "Perfil", icon: Contact, path: "/perfil" },
      { title: "Reportes", icon: BarChart, path: "/reportes" },
    ],
  },
];

const Nav = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const location = useLocation();

  const toggleMenu = (title) => {
    setActiveMenu(activeMenu === title ? "" : title);
  };

  return (
    <Container>
      <Sidebar>
        <LogoSection>
          <LogoIcon>
            <IceCream size={32} />
          </LogoIcon>
          <BrandText>
            Flavor<span>Burst</span>
          </BrandText>
        </LogoSection>

        <MenuSection>
          {menuItems.map((item) => (
            <MenuItem key={item.title}>
              {item.subItems ? (
                <MenuGroup>
                  <MenuButton
                    onClick={() => toggleMenu(item.title)}
                    $isActive={activeMenu === item.title}
                  >
                    <MenuContent>
                      <MenuIcon>
                        <item.icon size={20} />
                      </MenuIcon>
                      <span>{item.title}</span>
                    </MenuContent>
                    <ChevronIcon $isOpen={activeMenu === item.title}>
                      <ChevronDown size={16} />
                    </ChevronIcon>
                  </MenuButton>
                  <SubMenu $isOpen={activeMenu === item.title}>
                    {item.subItems.map((subItem) => (
                      <SubMenuButton
                        key={subItem.path}
                        to={subItem.path}
                        $isActive={location.pathname === subItem.path}
                      >
                        <subItem.icon size={18} />
                        <span>{subItem.title}</span>
                      </SubMenuButton>
                    ))}
                  </SubMenu>
                </MenuGroup>
              ) : (
                <MenuButton
                  as={Link}
                  to={item.path}
                  $isActive={location.pathname === item.path}
                >
                  <MenuContent>
                    <MenuIcon>
                      <item.icon size={20} />
                    </MenuIcon>
                    <span>{item.title}</span>
                  </MenuContent>
                </MenuButton>
              )}
            </MenuItem>
          ))}
        </MenuSection>

        <LogoutButton to="/logout">
          <LogOut size={20} />
          <span>Cerrar Sesión</span>
        </LogoutButton>
      </Sidebar>

      <Content>
        <Outlet />
      </Content>
    </Container>
  );
};

export default Nav;

const Colors = {
  primary: "#FF85B3",
  secondary: "#FFB8D4",
  accent: "#97E5EF",
  background: "#FFF5F8",
  text: "#4A4A4A",
  white: "#FFFFFF",
  hover: "#FFE5EE",
  gradient: "linear-gradient(135deg, #FF85B3 0%, #FFB8D4 100%)",
};

const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.nav`
  width: 280px;
  background: ${Colors.white};
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.05);
  padding: 1.5rem 0;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  margin-bottom: 2rem;
`;

const LogoIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${Colors.gradient};
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: ${Colors.white};
`;

const BrandText = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${Colors.text};

  span {
    background: ${Colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const MenuSection = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 1rem;

`;

const MenuItem = styled.div`
  margin-bottom: 0.5rem;
`;

const MenuContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const MenuIcon = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: ${(props) =>
    props.$isActive ? Colors.gradient : Colors.background};
  color: ${(props) => (props.$isActive ? Colors.white : Colors.text)};
  transition: all 0.3s ease;
`;

const MenuButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border: none;
  background: ${(props) => (props.$isActive ? Colors.hover : "transparent")};
  color: ${Colors.text};
  font-weight: 500;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  ${MenuIcon} {
    background: ${Colors.gradient};
    color: ${Colors.white};
  }
  &:hover {
    background: ${Colors.hover};
  }

  ${(props) =>
    props.$isActive &&
    `
    ${MenuIcon} {
      background: ${Colors.gradient};
      color: ${Colors.white};
    }
  `}
`;

const ChevronIcon = styled.div`
  transition: transform 0.3s ease;
  transform: rotate(${(props) => (props.$isOpen ? "180deg" : "0deg")});
  color: ${Colors.text};
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuGroup = styled.div``;

const SubMenu = styled.div`
  max-height: ${(props) => (props.$isOpen ? "500px" : "0")};
  overflow: hidden;
  transition: all 0.3s ease;
  padding-left: 1rem;
`;

const SubMenuButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  margin: 0.25rem 0;
  color: ${(props) => (props.$isActive ? Colors.primary : Colors.text)};
  text-decoration: none;
  font-size: 0.95rem;
  border-radius: 10px;
  transition: all 0.3s ease;
  background: ${(props) => (props.$isActive ? Colors.hover : "transparent")};

  &:hover {
    background: ${Colors.hover};
    color: ${Colors.primary};
  }
`;

const LogoutButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 1rem;
  padding: 1rem;
  color: ${Colors.text};
  text-decoration: none;
  border-radius: 12px;
  background: ${Colors.background};
  transition: all 0.3s ease;

  &:hover {
    background: ${Colors.primary}20;
    color: ${Colors.primary};
  }
`;

const Content = styled.main`
  flex: 1;
  margin-left: 280px;
  padding: 2rem;
`;
