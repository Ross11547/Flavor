import React from 'react'
import PageContainer from '../../../components/ui/pageContainer'
import TableContainer from '../../../components/ui/table/tableContainer'
import { clientJson } from '../../../data/clientJson'

const Cliente = () => {
  return (
    <PageContainer tittle={"Clientes"}>
      <TableContainer
      add={() => { }}
      onClickRow={{}}
      edit={{}}
      del={{}}
      reload={() => { }}
      data={clientJson}
      columns={[
        {
          id: "id",
          header: "Nombre",
          accessorFn: (row) => row.nombre,
        },
        {
          header: "NIT",
          accessorFn: (row) => row.nit,
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
        {
          header: "Puntos Fidelización",
          accessorFn: (row) => row.puntos_fidelizacion,
        },
      ]} />

    </PageContainer>
  )
}

export default Cliente