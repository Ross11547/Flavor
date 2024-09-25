import React from 'react';
import styled from 'styled-components';
import { Colors } from '../style/colors';

const NavContainer = styled.nav`
  width: 250px;
  height: 100vh;
  background-color: ${(props) => props.colors.primary500};
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const NavHeader = styled.div`
  font-size: 1.5rem;
  color: ${(props) => props.Colors.primary300};
  margin-bottom: 20px;
  font-weight: bold;
`;

const NavItem = styled.a`
  font-size: 1.1rem;
  padding: 15px 10px;
  margin: 10px 0;
  color: ${(props) => props.Colors.primary300};
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => props.colors.primary200};
    color: ${(props) => props.Colors.primary900};
  }
`;

const Nav = () => {
    return (
        <NavContainer colors={colors}>
            <NavHeader colors={colors}>Mi Navegación</NavHeader>
            <NavItem href="#" colors={colors}>Inicio</NavItem>
            <NavItem href="#" colors={colors}>Sobre Nosotros</NavItem>
            <NavItem href="#" colors={colors}>Servicios</NavItem>
            <NavItem href="#" colors={colors}>Contacto</NavItem>
        </NavContainer>
    );
};

export default Nav;
