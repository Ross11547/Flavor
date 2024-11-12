import React from 'react'
import PageContainer from '../../../components/ui/pageContainer';
import TableContainer from '../../../components/ui/table/tableContainer';
import { sucuJson } from '../../../data/sucujason';

const Sucursal = () => {
  return (
    <PageContainer tittle={"Sucursales"}>
      <TableContainer
        add={() => { }}
        onClickRow={{}}
        edit={{}}
        del={{}}
        reload={() => { }}
        data={sucuJson}
        columns={[
          {
            id: "id",
            header: "Nombre",
            accessorFn: (row) => row.nombre,
          },
          {
            header: "Teléfono",
            accessorFn: (row) => row.telefono,
          },
          {
            header: "Correo Electrónico",
            accessorFn: (row) => row.email,
          },
          {
            header: "Dirección",
            accessorFn: (row) => row.direccion,
          }
        ]} />
    </PageContainer>
  )
}

export default Sucursal;