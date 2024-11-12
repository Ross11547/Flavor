import React from 'react'
import PageContainer from '../../../components/ui/pageContainer'
import TableContainer from '../../../components/ui/table/tableContainer'
import { insuJson } from '../../../data/insuJson'

const Insumos = () => {
  return (
    <PageContainer tittle={"Insumos"}>
      <TableContainer
        add={() => { }}
        onClickRow={{}}
        edit={{}}
        del={{}}
        reload={() => { }}
        data={insuJson}
        columns={[
          {
            id: "id",
            header: "Nombre",
            accessorFn: (row) => row.nombre,
          },
          {
            header: "Descripción",
            accessorFn: (row) => row.descripcion,
          },
          {
            header: "Unidad Medida",
            accessorFn: (row) => row.unidad_medida,
          },
          {
            header: "Precio Unitario",
            accessorFn: (row) => row.precio_unitario,
          },
          {
            header: "Estado",
            accessorFn: (row) => row.estado,
          },
        ]} />

    </PageContainer>
  )
}

export default Insumos