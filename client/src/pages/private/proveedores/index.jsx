import React, { useState } from "react";
import PageContainer from "../../../components/ui/pageContainer";
import TableContainer from "../../../components/ui/table/tableContainer";
import { proveeJson } from "../../../data/proveeJson";
import useGet from "../../../hook/useGet";
import styled from "styled-components";
import useDelete from "../../../hook/useDelete";
import FormProveedor from "./components/formProveedor";

const Proveedor = () => {
  const { data,reload } = useGet("proveedor");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {
    deleteItem,
    loading: deleting,
    error,
    deleted,
  } = useDelete("proveedor");
  const [selectedUser, setSelectedUser] = useState(null);
  const handleAdd = () => {
    setSelectedUser(null);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedUser([]);
    reload();
  };
  const handleDelete = (id) => {
    deleteItem(id);
    if (deleted) {
      reload();
    }
  };
  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };
  return (
    <PageContainer tittle={"Proveedores"}>
      <TableContainer
        add={handleAdd}
        onClickRow={{}}
        edit={{ fn: (row) => handleEdit(row) }}
        del={{
          fn: (row) => handleDelete(row.id),
          disabled: (row) => row.estado === false,
        }}
        reload={reload}
        data={data.data}
        columns={[
          {
            id: "id",
            header: "Nombre",
            accessorFn: (row) => row.nombre,
          },
          {
            header: "Contacto",
            accessorFn: (row) => row.contacto,
          },
          {
            header: "Stock Mínimo",
            accessorFn: (row) => row.stock_minimo,
          },
          {
            header: "Telefono",
            accessorFn: (row) => row.telefono,
          },
          {
            header: "Correo Electrónico",
            accessorFn: (row) => row.email,
          },
          {
            header: "Dirección",
            accessorFn: (row) => row.direccion,
          },
        ]}
      />
      {isDrawerOpen && <Overlay onClick={handleCloseDrawer} />}
      <Drawer isOpen={isDrawerOpen}>
        <DrawerContent>
          <CloseButton onClick={handleCloseDrawer}>&times;</CloseButton>
          <FormProveedor onClose={handleCloseDrawer} userData={selectedUser} />
        </DrawerContent>
      </Drawer>
    </PageContainer>
  );
};

export default Proveedor;

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
