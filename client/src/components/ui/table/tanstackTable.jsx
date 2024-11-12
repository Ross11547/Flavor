import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import TablePDF from "./pdf/tablePDF";
/* import { TableView } from "./tableContainer"; */ 
import { forwardRef } from "react";
import Icon from "../../icons/icon";
import ControlButton from "./controlButton";

import styled from "styled-components";

const TanstackTable = forwardRef(
  (
    {
      data,
      columns,
      filter,
      setFilter,
      sorting,
      setSorting,
      onClickRow,
      view,
      del,
      edit,
      distinctOn,
      opacityOn,
    },
    tableRef
  ) => {
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: { sorting, globalFilter: filter },
      onSortingChange: setSorting,
      onGlobalFilterChange: setFilter,
    });

    const handleClickRow = (row) => {
      if (onClickRow) {
        if (onClickRow.disabled?.(row)) return;
        onClickRow.fn(row);
      }
    };

    let lastValue = "";
    let counter = 0;
    const classes = ["bg-primary-600/20", "bg-primary-700/10"];
    if (view === "PDF") {
      return <TablePDF table={table} />;
    }
    return (
      <Table
        ref={tableRef}
      >
        <Thead>
          {table.getHeaderGroups().map((group) => (
            <Tr key={group.id}>
              <Th>
                #
              </Th>
              {group.headers.map((header) => {
                const width = header.column.columnDef.meta?.width;
                const center = !!header.column.columnDef.meta?.center;
                const sticky = !!header.column.columnDef.meta?.sticky;
                const isColspan = typeof width === "number";
                return (
                  <StyledTh
                    sticky={sticky}
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{
                      flex:
                        width === undefined
                          ? `1 1 0%`
                          : isColspan
                          ? `${width} 1 0%`
                          : undefined,
                      width:
                        width === undefined
                          ? undefined
                          : isColspan
                          ? undefined
                          : width,
                      minWidth:
                        width === undefined
                          ? "200px"
                          : isColspan
                          ? undefined
                          : width,
                    }}
                    title={header.column.columnDef.header?.toString()}
                  >
                    <StyledDiv center={center}>
                      <P className="line-clamp-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </P>
                      <Div className="h-5 w-5">
                        {
                          {
                            none: <></>,
                            asc: <Icon type="up" />,
                            desc: <Icon type="down" />,
                          }[header.column.getIsSorted() || "none"]
                        }
                      </Div>
                    </StyledDiv>
                  </StyledTh>
                );
              })}
              {(edit || del) && (
                <ThDos>
                  Acciones
                </ThDos>
              )}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row, i) => {
            if (distinctOn) {
              if (lastValue !== row.original[distinctOn]) counter++;
              lastValue = row.original[distinctOn];
            }
            const withOpacity = !!opacityOn?.(row.original);
            return (
              <StyledTr
                onClickRow={onClickRow}
                row={row}
                distinctOn={distinctOn}
                classes={classes}
                counter={counter}
                withOpacity={withOpacity}
                key={row.id}
              >
                <StyledTd>
                  <DivDos>
                    <P>{i + 1}</P>
                  </DivDos>
                </StyledTd>
                {row.getVisibleCells().map((cell) => {
                  const width = cell.column.columnDef.meta?.width;
                  const center = !!cell.column.columnDef.meta?.center;
                  const sticky = !!cell.column.columnDef.meta?.sticky;
                  const isColspan = typeof width === "number";
                  return (
                    <StyledTda
                      sticky={sticky}
                      key={cell.id}
                      onClick={() => handleClickRow(row.original)}
                      style={{
                        flex:
                          width === undefined
                            ? `1 1 0%`
                            : isColspan
                            ? `${width} 1 0%`
                            : undefined,
                        width:
                          width === undefined
                            ? undefined
                            : isColspan
                            ? undefined
                            : width,
                        minWidth:
                          width === undefined
                            ? "200px"
                            : isColspan
                            ? undefined
                            : width,
                      }}
                    >
                      <StyledDive center={center}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </StyledDive>
                    </StyledTda>
                  );
                })}
                {(edit || del) && (
                  <Td>
                    <DivTres>
                      {edit && (
                        <ControlButton
                          title="Editar"
                          btnType="primary"
                          icon={<Icon type="edit" />}
                          onClick={() => edit.fn(row.original)}
                          disabled={edit.disabled?.(row.original)}
                        />
                      )}
                      {del && (
                        <ControlButton
                          title="Eliminar"
                          icon={<Icon type="delete" />}
                          onClick={() => del.fn(row.original)}
                          disabled={del.disabled?.(row.original)}
                        />
                      )}
                    </DivTres>
                  </Td>
                )}
              </StyledTr>
            );
          })}
        </Tbody>
      </Table>
    );
  }
);

export default TanstackTable;

const Table = styled.table`
  width: 100%;              
  display: flex;              
  flex-direction: column;     
  gap: 0.5rem;                
  position: relative;         
  overflow-x: auto;           
  overflow-y: scroll;         
  padding-right: 1rem;        
`;

const Thead = styled.thead`
  position: sticky;   
  top: 0;             
  z-index: 20;             
`;

const Tr = styled.tr`
  display: flex;               
  background-color: var(--bg); 
  min-width: fit-content;              
`;

const Th = styled.th`
  font-size: 12px;                     
  min-width: 2.5rem;                   
  width: 2.5rem;                        
  padding: 0.5rem 0.5rem;             
  font-weight: bold;                   
  color: var(--primary-900);          
  text-align: center;                 
  user-select: none;               
`;

const P = styled.p`
   display: -webkit-box;           
  -webkit-box-orient: vertical;   
  -webkit-line-clamp: 1;          
  overflow: hidden;               
`;

const Div = styled.div`
  height: 1.25rem;
  width: 1.25rem;            
`;

const ThDos = styled.th`
  min-width: 10rem;               
  width: 10rem;                   
  font-size: 0.875rem;            
  padding: 0.5rem 0.5rem;         
  font-weight: bold;              
  color: var(--primary-900);      
  text-align: center;             
  user-select: none;               
`;

const Tbody = styled.tbody`
  display: flex;              
  flex-direction: column;    
  gap: 0.5rem;             
`;

const DivDos = styled.div`
  display: flex;                
  align-items: center;          
  height: 100%;                 
  width: 100%;                  
  justify-content: center;           
`;

const Td = styled.td`
  min-width: 10rem;               
  width: 10rem;                   
  padding: 0.5rem 0.5rem;        
  font-size: 0.875rem;            
  color: #1f2937;            
`;

const DivTres = styled.div`
  display: flex;                
  align-items: center;          
  height: 100%;                 
  width: 100%;                  
  justify-content: center;           
`;

const StyledTd = styled.td`
  min-width: 2.5rem; 
  width: 2.5rem; 
  padding: 0.5rem 0.5rem;
  font-size: 12px; 
  text-align: center;
  color: #1f2937; 
`;
const StyledTh = styled.th`
  padding: 0.5rem 0.5rem; 
  font-size: 0.875rem; 
  font-weight: bold; 
  color: #1f2937; 
  text-align: left; 
  user-select: none;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #e5e7eb; 
  }

  ${({ sticky }) =>
    sticky &&
    `
      position: sticky;
      left: 0;
      background-color: #f3f4f6; 
      border-right: 1px solid #d1d5db;
    `}
`;
const StyledDiv = styled.div`
  display: flex;
  ${({ center }) => center && `justify-content: center;`}
`;
const StyledTr = styled.tr`
  display: flex;
  transition: all 0.3s;
  border-radius: 0.5rem; 
  border: 1px solid #d1d5db; 
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  min-width: fit-content; 

  ${({ onClickRow, row }) =>
    onClickRow &&
    !onClickRow.disabled?.(row) &&
    `
      cursor: pointer;
      &:hover {
        background-color: #f0f9ff;
      }
    `}

  ${({ distinctOn, classes, counter }) =>
    distinctOn && classes[counter % classes.length]}

  ${({ withOpacity }) =>
    withOpacity &&
    `
    opacity: 0.4; /* opacity-40 */
  `}
`;
const StyledTda = styled.td`
  padding: 0.5rem; 
  font-size: 0.875rem;
  color: #1f2937; 

  ${({ sticky }) =>
    sticky &&
    `
      position: sticky;
      left: 0;
      background-color: inherit; 
      z-index: 10; 
      border-right: 1px solid #d1d5db; 
    `}
`;
const StyledDive = styled.div`
  display: flex;
  align-items: center; 
  height: 100%;
  width: 100%;

  ${({ center }) =>
    center &&
    `
      justify-content: center; 
    `}
`;
