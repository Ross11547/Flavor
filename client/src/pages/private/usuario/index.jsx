import React from "react";
import PageContainer from "../../../components/ui/pageContainer";
import TableContainer from "../../../components/ui/table/tableContainer";
import { proveeJson } from "../../../data/proveeJson";
import useGet from "../../../hook/useGet";
const Usuario = () => {
  const { data, loading } = useGet("usuario");
  console.log(data);
  return (
    <PageContainer tittle={"Usuarios"}>
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
    </PageContainer>
  );
};

export default Usuario;
