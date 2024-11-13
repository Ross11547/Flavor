import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const FormUsuario = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    rol: "",
    telefono: "",
    correo: "",
    password: "",
    estado: false,
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/usuario",
        formData
      );
      console.log("Datos enviados:", response.data);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Registro de Usuario</FormTitle>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="nombre">Nombre</Label>
        <Input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />

        <Label htmlFor="rol">Rol</Label>
        <Input
          type="text"
          id="rol"
          name="rol"
          value={formData.rol}
          onChange={handleChange}
          required
        />

        <Label htmlFor="telefono">Teléfono</Label>
        <Input
          type="tel"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          required
        />

        <Label htmlFor="correo">Correo</Label>
        <Input
          type="email"
          id="correo"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          required
        />

        <Label htmlFor="password">Contraseña</Label>
        <Input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Label>
          <Input
            type="checkbox"
            name="estado"
            checked={formData.estado}
            onChange={handleChange}
          />
          Activo
        </Label>

        <Button type="submit">Registrar</Button>
      </form>
    </FormContainer>
  );
};

export default FormUsuario;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f4f4f9;
  max-width: 500px;
  margin: auto;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  color: #333;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #333;
  margin-top: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  margin-top: 1.5rem;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
