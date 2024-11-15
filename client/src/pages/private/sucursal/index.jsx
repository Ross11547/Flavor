import React from "react";
import PageContainer from "../../../components/ui/pageContainer";
import TableContainer from "../../../components/ui/table/tableContainer";
import { sucuJson } from "../../../data/sucujason";
import useGet from "../../../hook/useGet";

const Sucursal = () => {
  const { data } = useGet("sucursal");
  return (
    <PageContainer tittle={"Sucursales"}>
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
          },
        ]}
      />
    </PageContainer>
  );
};

export default Sucursal;
