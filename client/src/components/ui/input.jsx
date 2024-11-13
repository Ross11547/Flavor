import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../style/colors';

const Input = ({ title, value, placeholder, onChange, type = "text", name, disabled }) => {
  return (
    <>
      <Label>{title}</Label>
      <InputStyled
        type={type}
        name={name}            // Agregar el atributo name
        placeholder={placeholder || title}
        value={value}
        onChange={onChange}
        disabled={disabled}    // Agregar el atributo disabled
      />
    </>
  );
};

export default Input;

const InputStyled = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 25px;
  border: 1px solid #d1d9e6;
  border-radius: 15px;
  outline: none;
  height: 40px;
  font-weight: 700;
  color: ${Colors.gray200};
  
  &::placeholder {
    color: ${Colors.gray200};
    font-weight: 700;
  }

  &:disabled {
    background-color: #f0f0f0; // Cambiar el fondo cuando está deshabilitado
    cursor: not-allowed;
  }
`;

export const Label = styled.label`
  font-size: 18px;
  font-weight: 700;
  color: ${Colors.primary300};
`;
