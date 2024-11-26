import styled from "styled-components";

export const Colors = {
  primary: "#ff8fab",    // Rosa principal
  secondary: "#ffe5ec",  // Rosa claro
  white: "#ffffff",      // Blanco
  gray: "#f6f6f6",      // Gris muy claro para fondos
  grayBorder: "#e9e9e9", // Gris para bordes
  textPrimary: "#0d1b2a" // Texto principal
};

export const PageContainer = styled.div`
padding: 1.5rem;
max-width: 1200px;
margin: 0 auto;
background: ${Colors.white};
`;

export const Button = styled.button`
display: inline-flex;
align-items: center;
gap: 0.5rem;
padding: 0.625rem 1rem;
border: none;
border-radius: 0.375rem;
font-weight: 500;
font-size: 0.875rem;
cursor: pointer;
transition: all 0.15s ease;

${({ variant }) => {
  switch (variant) {
    case "primary":
      return `
        background: ${Colors.primary};
        color: ${Colors.white};
        &:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
      `;
    case "secondary":
      return `
        background: transparent;
        color: ${Colors.primary};
        &:hover {
    
          transform: translateY(-1px);
        }
      `;
    case "danger":
      return `
        background: ${Colors.white};
        color: ${Colors.primary};
        border: 1px solid ${Colors.primary};
        &:hover {
          background: ${Colors.secondary};
        }
      `;
    default:
      return "";
  }
}}
`;

export const TableContainer = styled.div`
background: ${Colors.white};
border-radius: 0.75rem;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
overflow: hidden;
margin: 1rem;
`;

export const TableHeader = styled.div`
padding: 1.25rem;
border-bottom: 1px solid ${Colors.grayBorder};
display: flex;
justify-content: space-between;
align-items: center;
flex-wrap: wrap;
gap: 0.75rem;
`;

export const SearchContainer = styled.div`
display: flex;
align-items: center;
background: ${Colors.gray};
border-radius: 0.375rem;
padding: 0.375rem 0.75rem;
width: 280px;
transition: all 0.15s ease;

&:focus-within {
  background: ${Colors.white};
  box-shadow: 0 0 0 2px ${Colors.secondary};
}

svg {
  color: #999;
  width: 1rem;
  height: 1rem;
}

input {
  border: none;
  background: transparent;
  padding: 0.25rem 0.5rem;
  width: 100%;
  font-size: 0.875rem;
  outline: none;

  &::placeholder {
    color: #999;
  }
}
`;

export const ButtonGroup = styled.div`
display: flex;
gap: 0.5rem;
`;

export const Table = styled.table`
width: 100%;
border-collapse: separate;
border-spacing: 0;
`;

export const Th = styled.th`
padding: 0.875rem;
text-align: left;
font-weight: 500;
font-size: 0.875rem;
color: ${Colors.textPrimary};
background: ${Colors.gray};
border-bottom: 1px solid ${Colors.grayBorder};
white-space: nowrap;
`;

export const Td = styled.td`
padding: 0.875rem;
color: ${Colors.textPrimary};
font-size: 0.875rem;
border-bottom: 1px solid ${Colors.grayBorder};
transition: background-color 0.15s ease;

&:first-child {
  padding-left: 1.5rem;
}

&:last-child {
  padding-right: 1.5rem;
}

&:hover {
  background: ${Colors.gray};
}
`;

export const ActionButtons = styled.div`
display: flex;
gap: 0.375rem;
`;

export const FormContainer = styled.div`
position: fixed;
right: 0;
top: 0;
height: 100vh;
width: 100%;
max-width: 450px;
background: ${Colors.white};
box-shadow: -2px 0 12px rgba(0, 0, 0, 0.05);
padding: 1.75rem;
transform: translateX(${({ isOpen }) => (isOpen ? "0" : "100%")});
transition: transform 0.2s ease-out;
overflow-y: auto;
`;

export const FormHeader = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 1.75rem;
padding-bottom: 0.875rem;
border-bottom: 1px solid ${Colors.grayBorder};
`;

export const FormTitle = styled.h2`
font-size: 2rem;
color: ${Colors.textPrimary};
font-weight: 600;
margin: 0;
`;

export const FormGroup = styled.div`
margin-bottom: 1.25rem;
`;

export const Label = styled.label`
display: block;
margin-bottom: 0.375rem;
color: ${Colors.textPrimary};
font-weight: 500;
font-size: 0.875rem;
`;

export const InputSelect = styled.select`
width: 100%;
padding: 0.625rem;
border: 1px solid ${Colors.grayBorder};
border-radius: 0.375rem;
font-size: 0.875rem;
transition: all 0.15s ease;
background-color: ${Colors.white};

&:focus {
  outline: none;
  border-color: ${Colors.primary};
  box-shadow: 0 0 0 2px ${Colors.secondary};
}
`;

export const Input = styled.input`
width: 100%;
padding: 0.625rem;
border: 1px solid ${Colors.grayBorder};
border-radius: 0.375rem;
font-size: 0.875rem;
transition: all 0.15s ease;

&:focus {
  outline: none;
  border-color: ${Colors.primary};
  box-shadow: 0 0 0 2px ${Colors.secondary};
}

&::placeholder {
  color: #999;
}

&:hover {
  border-color: ${Colors.primary}99;
}
`;