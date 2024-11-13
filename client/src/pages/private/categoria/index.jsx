import React from "react";
import PageContainer from "../../../components/ui/pageContainer";
import TableContainer from "../../../components/ui/table/tableContainer";
import { cateJson } from "../../../data/catejson";
import useGet from "../../../hook/useGet";

const Categoria = () => {
  const { data } = useGet("categoria");
  return (
    <PageContainer tittle={"Categoria"}>
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
        ]}
      />
    </PageContainer>
  );
};

export default Categoria;
