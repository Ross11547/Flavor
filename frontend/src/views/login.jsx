import React, { useState } from "react";
import { Lock, Mail, LogIn } from "lucide-react";
import imgLogin from "../assets/img/imgLogin.jpg";
import imgIce from "../assets/img/iceCream.png";
import imgFla from "../assets/img/imgLogoFlavor.jpeg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Url } from "../config";
import { useUser } from "../context/useContext";
import {
  LoginContainer,
  LoginImage,
  LoginImg,
  LoginLeft,
  LoginRight,
  StyledInput,
  InputWrapper,
  IconWrapper,
  LoginButtona,
  LoginWrapper,
  Logo,
  Title,
  LogoContainer,
} from "../style/loginStyled";
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    correo: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useUser();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      setIsLoading(true);
      const response = await fetch(`${Url}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: formData.correo,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Credenciales inválidas. Inténtalo de nuevo.");
      }

      const data = await response.json();
      toast.success(data.message);
      login(data);
      navigate("/usuarios");
    } catch (err) {
      console.error(err);
      setError("Credenciales inválidas. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <LoginContainer>
      <LoginLeft>
        <LoginImage src={imgIce} alt="Imagen de helado" />
      </LoginLeft>
      <LoginRight>
        <LoginImg src={imgLogin} alt="Imagen de fondo" />
        <LoginWrapper>
          <LogoContainer>
            <Logo src={imgFla} alt="Logo Flavor Burst" />
            <Title>¡Bienvenido!</Title>
          </LogoContainer>
          <form onSubmit={handleLogin}>
            <InputWrapper>
              <IconWrapper>
                <Mail size={20} />
              </IconWrapper>
              <StyledInput
                placeholder="Correo electrónico"
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </InputWrapper>
            <InputWrapper>
              <IconWrapper>
                <Lock size={20} />
              </IconWrapper>
              <StyledInput
                placeholder="Contraseña"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </InputWrapper>
            <LoginButtona type="submit" disabled={isLoading}>
              {isLoading ? "Cargando..." : "Entrar"}
              <LogIn size={20} />
            </LoginButtona>
          </form>
        </LoginWrapper>
      </LoginRight>
    </LoginContainer>
  );
};

export default Login;
