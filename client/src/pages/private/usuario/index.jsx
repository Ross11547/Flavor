import React, { useState } from "react";
import PageContainer from "../../../components/ui/pageContainer";
import TableContainer from "../../../components/ui/table/tableContainer";
import useGet from "../../../hook/useGet";
import FormUsuario from "./components/formUsuario";
import styled from "styled-components";

const Usuario = () => {
  const { data, reload } = useGet("usuario");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleAdd = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    reload();
  };

  return (
    <PageContainer tittle={"Usuarios"}>
      <TableContainer
        add={handleAdd}
        onClickRow={{}}
        edit={{}}
        del={{}}
        reload={reload}
        data={data.data}
        columns={[
          {
            id: "id",
            header: "Nombre",
            accessorFn: (row) => row.nombre,
          },
          {
            header: "Telefono",
            accessorFn: (row) => row.telefono,
          },
          {
            header: "Correo Electrónico",
            accessorFn: (row) => row.correo,
          },
          {
            header: "Estado de usuario",
            accessorFn: (row) => row.estado,
          },
        ]}
      />
      {/* El Overlay ahora está fuera del Drawer */}
      {isDrawerOpen && <Overlay onClick={handleCloseDrawer} />}
      <Drawer isOpen={isDrawerOpen}>
        <DrawerContent>
          <CloseButton onClick={handleCloseDrawer}>&times;</CloseButton>
          <FormUsuario onClose={handleCloseDrawer} />
        </DrawerContent>
      </Drawer>
    </PageContainer>
  );
};

export default Usuario;

const Drawer = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  height: 100vh;
  width: 100%;
  max-width: 500px;
  background: white;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  transition: right 0.3s ease-in-out;
  z-index: 1001;
`;

const DrawerContent = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 2rem;
  position: relative;
  background: white;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  color: #666;
  transition: color 0.2s ease;

  &:hover {
    color: #000;
  }
`;
