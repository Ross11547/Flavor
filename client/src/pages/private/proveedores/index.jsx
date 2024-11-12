import React from 'react'
import PageContainer from '../../../components/ui/pageContainer'
import TableContainer from '../../../components/ui/table/tableContainer'
import { proveeJson } from '../../../data/proveeJson'

const Proveedor = () => {
  return (
    <PageContainer tittle={"Proveedores"}>
      <TableContainer
      add={() => { }}
      onClickRow={{}}
      edit={{}}
      del={{}}
      reload={() => { }}
      data={proveeJson}
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
      ]} />

    </PageContainer>
  );
};

export default Proveedor;