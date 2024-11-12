import React from 'react';
import styled from 'styled-components';

const Button = ({ onClick, name }) => {
  return (
    <LoginButton onClick={onClick}>{name}</LoginButton> // Cambiado a onClick
  );
};

export default Button;

const LoginButton = styled.button`
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
