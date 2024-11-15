import React, { useState } from "react";
import styled from "styled-components";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
const FormUsuario = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    rol: "",
    telefono: "",
    correo: "",
    password: "",
    estado: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const formDataToSend = {
    ...formData,
    telefono: Number(formData.telefono),
  };
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
      console.log(formData);
      const response = await fetch("http://localhost:3000/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Datos enviados:", data);
        toast.success(data.mensaje);
        onClose();
        setFormData({
          nombre: "",
          rol: "",
          telefono: "",
          correo: "",
          password: "",
          estado: false,
        });
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <PageContainer>
      <FormCard>
        <FormTitle>Registro de Usuario</FormTitle>
        <StyledForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Nombre</Label>
            <Input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Rol</Label>
            <Input
              type="text"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Teléfono</Label>
            <Input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Correo</Label>
            <Input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Contraseña</Label>
            <PasswordWrapper>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </PasswordToggle>
            </PasswordWrapper>
          </FormGroup>

          <CheckboxGroup>
            <CheckboxInput
              type="checkbox"
              name="estado"
              checked={formData.estado}
              onChange={handleChange}
            />
            <CheckboxLabel>Activo</CheckboxLabel>
          </CheckboxGroup>

          <SubmitButton type="submit">Registrar</SubmitButton>
        </StyledForm>
      </FormCard>
    </PageContainer>
  );
};

export default FormUsuario;

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: #fff;
`;

const FormCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 420px;
`;

const FormTitle = styled.h2`
  color: #1a1a1a;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #4a5568;
  font-size: 0.875rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.625rem;
  border: 1.5px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  outline: none;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #718096;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: color 0.2s ease;

  &:hover {
    color: #4a5568;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CheckboxInput = styled.input`
  width: 1rem;
  height: 1rem;
  accent-color: #3b82f6;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  color: #4a5568;
  font-size: 0.875rem;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 0.75rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 0.5rem;

  &:hover {
    background-color: #2563eb;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
  }
`;
