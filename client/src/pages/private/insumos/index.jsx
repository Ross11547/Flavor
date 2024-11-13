import React from "react";
import PageContainer from "../../../components/ui/pageContainer";
import TableContainer from "../../../components/ui/table/tableContainer";
import { insuJson } from "../../../data/insuJson";
import useGet from "../../../hook/useGet";

const Insumos = () => {
  const { data } = useGet("insumo");
  return (
    <PageContainer tittle={"Insumos"}>
      <TableContainer
        add={() => {}}
        onClickRow={{}}
        edit={{}}
        del={{}}
        reload={() => {}}
        data={data.data}
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
            header: "Stock Actual",
            accessorFn: (row) => row.stockActual,
          },
          {
            header: "Unidad de Medida",
            accessorFn: (row) => row.unidadMedida,
          },
          {
            header: "Precio Unitario",
            accessorFn: (row) => row.precioUnitario,
          },
          {
            header: "Estado",
            accessorFn: (row) => (row.estado ? "Activo" : "Inactivo"),
          },
        ]}
      />
    </PageContainer>
  );
};

export default Insumos;
