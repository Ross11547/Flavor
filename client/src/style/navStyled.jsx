import styled from "styled-components";
import { Colors } from "../style/colors";
import { Link } from "react-router-dom";

export const DivButtonNav = styled.div`
  position: fixed;
  top: 20px;
  left: ${({ visible }) => (visible ? "240px" : "20px")};
  z-index: 1000;
  transition: all 0.5s ease-in-out;
`;

export const BottonNav = styled.button`
  background: ${Colors.primary300};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${Colors.secundary100};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
    background: ${Colors.secundary100};
    color: ${Colors.primary300};
  }
`;

export const ContainerPadre = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

export const NavContainer = styled.nav`
  width: 280px;
  display: ${({ visible }) => (visible ? "0" : "-280px")};
  background: ${Colors.primary300};
  padding: 20px;
  border-radius: 0 50px 50px 0;
  box-shadow: 2px 0 10px ${Colors.gray100};
  transition: all 0.5s ease-in-out;
`;

export const ScrollContainer = styled.div`
  height: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-track {
    background: ${Colors.primary300};
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${Colors.secundary100};
    border-radius: 3px;
  }
`;

export const NavHeader = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  flex-direction: row;
`;

export const ImgLetra = styled.img`
  width: 180px;
  height: 100px;
  margin-bottom: 15px;
`;

export const NavItem = styled(Link)`
  width: 100%;
  height: 75px;
  font-size: 16px;
  padding: 0px 37px;
  margin: 15px 0;
  color: ${Colors.secundary100};
  text-decoration: none;
  font-weight: bold;
  display: flex;
  align-items: center;
  transition: all 0.5s ease-in-out;
  border-radius: 8px;
  &:hover {
    color: ${Colors.primary300};
    background: ${Colors.secundary100};
    border-radius: 8px;
    transform: translateX(5px);
    transition: all 0.5s ease-in-out;
    &:hover span {
      color: ${Colors.primary300};
      transition: all 0.5s ease-in-out;
    }
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 50px;
  font-size: 16px;
  margin: 15px 0;
  background: ${Colors.secundary100};
  color: ${Colors.primary300};
  text-decoration: none;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease-in-out;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

export const Icons = styled.span`
  margin-right: 10px;
  font-size: 20px;
  color: ${Colors.primary300};
`;

export const Icon = styled.span`
  margin-right: 10px;
  font-size: 20px;
  color: ${Colors.secundary100};
  transition: all 0.5s ease-in-out;
`;

export const SubMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  background: ${Colors.primary300};
  border-left: 5px solid ${Colors.secundary100};
  transition: all 0.3s ease-in-out;
  padding-right: 10px;
`;

export const SubMenuItem = styled.a`
  padding: 8px 16px;
  text-decoration: none;
  color: ${Colors.secundary100};
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${Colors.secundary100};
    color: ${Colors.primary300};
    border-radius: 4px;
  }
`;

export const ParentIcon = styled.span`
  margin-left: auto;
  display: flex;
  align-items: center;
  color: ${Colors.secundary100};
`;

export const DivOutlet = styled.div`
  width: calc(100vw - 250px);
  padding: 20px;
`;
