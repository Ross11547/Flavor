import React, { useState } from 'react';
import { DivFlavor, ImgFlavor, LoginBox, LoginButton, LoginContainer, LoginImage, LoginImg, LoginLeft, LoginRight, LoginTitle } from '../style/loginStyled';
import imgLogin from '../assets/img/imgLogin.jpg';
import imgIce from '../assets/img/iceCream.png';
import imgFla from '../assets/img/imgLogoFlavor.jpeg';
import Input from '../components/ui/input';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../enums/routes/Routes';
import styled from 'styled-components';
import { toastError, toastSuccess } from "../utils/toasts"

const Login = () => {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState();
    const [password, setPassword] = useState();

    // Usuario de prueba
    const mockUser = {
        email: "test@test.com",
        password: "123456"
    };


    const validateForm = () => {
        if (!correo || !password) {
            toastError("Por favor complete todos los campos");
            return false;
        }

        if (!correo.includes('@')) {
            toastError("Por favor ingrese un email válido");
            return false;
        }

        return true;
    };

    const handleLogin = (e) => {
        e.preventDefault();
     /*    if (!validateForm()) return;
        if (correo === mockUser.email && password === mockUser.password) {
            toastSuccess("¡Inicio de sesión exitoso!"); */
            navigate(ROUTES.DASHBOARD);
       /*  } else {
            toastError("Credenciales incorrectas");
        } */
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
                            title="Correo electronico"
                            type="text"
                            name="email"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                        <Input
                            title="Contraseña"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        <Button type="submit">Entrar</Button>
                    </form>
                </LoginBox>
            </LoginRight>
        </LoginContainer>
    );
};

export default Login;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #EA88AB;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  font-size: 17px;
  &:hover {
    background-color: #E0A2B4;
    color: white;
  }
`;