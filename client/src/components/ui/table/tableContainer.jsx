import { useRef, useState } from "react";
import TableControls from "./tableControls";
import TanstackTable from "./tanstackTable";
/* import { ColumnDef } from "@tanstack/react-table";
 */import Loader from "../loader/loader";
import Nothing from "../loader/nothing";
import styled from "styled-components";

const TableContainer = ({
  data,
  columns,
  reports = true,
  reload,
  add,
  onClickRow,
  del,
  button,
  edit,
  distinctOn,
  disableButtons = false,
  opacityOn
}) => {
  const [sorting, setSorting] = useState([]);
  const [filter, setFilter] = useState("");
  const [view, setView] = useState("table");
  const tableRef = useRef(null);

  return (
    <Container className="flex-1 flex flex-col overflow-auto">
      <TableControls
        tableCurrentRef={tableRef.current}
        loading={!data}
        filter={[filter, setFilter]}
        reload={reload}
        add={add}
        view={[view, setView]}
        reports={reports}
        show={data ? data.length > 0 : false}
        button={button}
        disableButtons={disableButtons}
      />
      <TablContainer className="flex flex-1 overflow-auto w-full">
        {data ? (
          data.length > 0 ? (
            <TanstackTable
              ref={tableRef}
              columns={columns}
              data={data}
              filter={filter}
              setFilter={setFilter}
              sorting={sorting}
              setSorting={setSorting}
              onClickRow={onClickRow}
              view={view}
              del={del}
              edit={edit}
              distinctOn={distinctOn}
              opacityOn={opacityOn}
            />
          ) : (
            <Nothing />
          )
        ) : (
          <Loader />
        )}
      </TablContainer>
    </Container>
  );
};

export default TableContainer;

const Container = styled.div`
  display:flex;
  flex: 1;
  flex-direction: column;
  overflow: auto;
`;

const TablContainer = styled.div`
  width: 100%;
  display:flex;
  flex: 1;
  overflow: auto;
`;