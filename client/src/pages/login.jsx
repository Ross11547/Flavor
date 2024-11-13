import React, { useState } from "react";
import {
  DivFlavor,
  ImgFlavor,
  LoginBox,
  LoginContainer,
  LoginImage,
  LoginImg,
  LoginLeft,
  LoginRight,
  LoginTitle,
} from "../style/loginStyled";
import imgLogin from "../assets/img/imgLogin.jpg";
import imgIce from "../assets/img/iceCream.png";
import imgFla from "../assets/img/imgLogoFlavor.jpeg";
import Input from "../components/ui/input";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../enums/routes/Routes";
import styled from "styled-components";
import toast from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    correo: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.correo || !formData.password) {
      toastError("Por favor complete todos los campos");
      return false;
    }

    if (!formData.correo.includes("@")) {
      toastError("Por favor ingrese un email válido");
      return false;
    }

    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);

      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: formData.correo,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error en el inicio de sesión");
      }

      localStorage.setItem("token", data.token);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      toast.success("¡Bienvenido!");
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      toast.error(error.message || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginLeft>
        <LoginImage src={imgIce} alt="Imagen de helado" />
      </LoginLeft>
      <LoginRight>
        <LoginImg src={imgLogin} alt="Imagen de fondo" />
        <LoginBox>
          <DivFlavor>
            <ImgFlavor src={imgFla} alt="Logo Flavor Burst" />
            <LoginTitle>¡Bienvenido!</LoginTitle>
          </DivFlavor>
          <form onSubmit={handleLogin}>
            <Input
              title="Correo electrónico"
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              disabled={isLoading}
            />
            <Input
              title="Contraseña"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
            />
            <LoginButton type="submit" disabled={isLoading}>
              {isLoading ? "Cargando..." : "Entrar"}
            </LoginButton>
          </form>
        </LoginBox>
      </LoginRight>
    </LoginContainer>
  );
};

export default Login;

const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: ${(props) => (props.disabled ? "#cccccc" : "#EA88AB")};
  color: white;
  border: none;
  border-radius: 10px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-weight: 700;
  font-size: 17px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#cccccc" : "#E0A2B4")};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(234, 136, 171, 0.5);
  }
`;
