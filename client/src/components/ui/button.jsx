import React from 'react'
import styled from 'styled-components'
const Button = ({ onclick, name }) => {
  return (
    <LoginButton onclick={onclick}>{name}</LoginButton>
  )
}

export default Button
export const LoginButton = styled.button`
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