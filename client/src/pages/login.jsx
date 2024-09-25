import React from 'react';
import { DivFlavor, ImgFlavor, Label, LoginBox, LoginButton, LoginContainer, LoginImage, LoginImg, LoginLeft, LoginRight, LoginTitle } from '../style/loginStyled';
import imgLogin from '../assets/img/imgLogin.jpg';
import imgIce from '../assets/img/iceCream.png';
import imgFla from '../assets/img/imgLogoFlavor.jpeg';
import Input from '../components/ui/input';
import Button from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../enums/routes/Routes';
const Login = () => {

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
                        <LoginTitle>Bienvenido!</LoginTitle>
                    </DivFlavor>
                    <form>
                        <Input title="Correo electronico" type="text" />
                        <Input title="Contraseña" type="password" />
                        <Button name="Entrar" />
                    </form>
                </LoginBox>
            </LoginRight>
        </LoginContainer>
    );
};

export default Login;

