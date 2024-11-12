import { DownloadTableExcel } from "react-export-table-to-excel";
import ControlButton from "./controlButton";
/* import { TableView } from "./tableContainer";
 */ import Icon from "../../icons/icon";
import { useId } from "react";
import { toastSuccess } from "../../../utils/toasts";
import styled from "styled-components";
const TableControls = ({
  filter,
  reload,
  add,
  view,
  loading,
  tableCurrentRef,
  reports,
  show,
  button,
  disableButtons,
}) => {
  const idSearch = useId();
  const [filterValue, setFilter] = filter;
  const [viewValue, setView] = view;

  const handleEmpty = () => {
    setFilter("");
    const input = document.getElementById(idSearch);
    input?.focus();
  };

  const handleReload = async () => {
    if (!reload) return;
    await reload();
    toastSuccess("Recargado correctamente");
  };

  return (
    <DivContainer>
      <DivUno>
        {!!add && (
          <ControlButton
            hideOnScreen
            disabled={disableButtons || viewValue !== "table"}
            title="Añadir dato"
            onClick={add}
            icon={<Icon type="add" />}
            btnType="primary"
            text="Añadir"
          />
        )}
        {button && (
          <ControlButton
            hideOnScreen
            disabled={viewValue !== "table"}
            title={button.text}
            onClick={button.fn}
            icon={button.icon}
            text={button.text}
            btnType={button.type || "secondary"}
          />
        )}
      </DivUno>
      {show && (
        <>
          <DivDos className="flex-[2_1_0] flex justify-end">
            <DivTres className="flex items-end gap-4 max-[872px]:gap-2">
              {!!reload && (
                <ControlButton
                  disabled={disableButtons || viewValue !== "table"}
                  title="Recargar datos"
                  onClick={handleReload}
                  icon={<Icon type="reload" />}
                />
              )}
              {reports && (
                <>
                  <ControlButton
                    hideOnScreen
                    disabled={disableButtons || loading}
                    title={viewValue === "PDF" ? "Ver tabla" : "Ver PDF"}
                    onClick={() =>
                      setView((old) => (old === "PDF" ? "table" : "PDF"))
                    }
                    icon={
                      viewValue === "PDF" ? (
                        <Icon type="list" />
                      ) : (
                        <Icon type="pdf" />
                      )
                    }
                    text="PDF"
                  />
                  <DownloadTableExcel
                    filename="tabla"
                    sheet="tabla"
                    currentTableRef={tableCurrentRef}
                  >
                    <ControlButton
                      hideOnScreen
                      disabled={disableButtons || loading}
                      title="Exportar Excel"
                      icon={<Icon type="excel" />}
                      text="Excel"
                    />
                  </DownloadTableExcel>
                </>
              )}
            </DivTres>
          </DivDos>
          <DivCuatro>
            <DivCinco>
              <Icon type="search" />
            </DivCinco>
            <StyledInput
              id={idSearch}
              autoFocus
              disabled={viewValue !== "table"}
              type="text"
              placeholder="Buscar..."
              value={filterValue}
              onChange={(e) => setFilter(e.target.value)}
            />
            {filterValue !== "" && (
              <DivSeis>
                <Button
                  onClick={handleEmpty}
                >
                  <Icon type="x" />
                </Button>
              </DivSeis>
            )}
          </DivCuatro>
        </>
      )}
    </DivContainer>
  );
};

export default TableControls;

const DivContainer = styled.div`
  width: 100%;                   
  display: flex;                
  flex-wrap: wrap;               
  padding-bottom: 1rem;          
  gap: 1rem;                    
  align-items: flex-end;

  @media (max-width: 872px) {
    gap: 0.5rem; 
  }
`;

const DivUno = styled.div`
  display: flex;                
  gap: 1rem;

  @media (max-width: 872px) {
    gap: 0.5rem; 
  }
`;

const DivDos = styled.div`
  flex: 2 1 0;                   
  display: flex;                 
  justify-content: flex-end;  
`;

const DivTres = styled.div`
  display: flex;                
  align-items: flex-end;         
  gap: 1rem;                     


  @media (max-width: 872px) {
    gap: 0.5rem; 
  }
  
`;

const DivCuatro = styled.div`
  position: relative;           
  flex: 1;   
`;

const DivCinco = styled.div`
  position: absolute;            
  left: 0;                       
  top: 50%;                      
  transform: translateY(-50%);
  aspect-ratio: 1 / 1;          
  height: 100%;                 
  padding: 0.5rem;               
  pointer-events: none;         
  color: var(--primary-700); 
`;

const DivSeis = styled.div`
  position: absolute;            
  right: 0;                     
  top: 50%;                      
  transform: translateY(-50%);   
  aspect-ratio: 1 / 1;          
  height: 100%;                  
  padding: 0.25rem;              
  display: flex;                
  align-items: center;          
  justify-content: center; 
`;

const Button = styled.button`
  border: 1px solid;
  border-radius: 0.5rem;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  padding: 0.25rem;
  outline: none;
  box-shadow: inset 0 0 0 0;
  transition: all 0.3s;

  &:focus {
    box-shadow: 0 0 0 2px var(--ring-color);
  }
`;

const StyledInput = styled.input`
  width: 100%;
  min-width: 80px;
  padding: 0 1rem 0 2rem;
  border-radius: 0.5rem;
  height: 2rem;
  outline: none;
  font-size: 0.875rem;
  border: 1px solid #cbd5e1; 
  color: #374151; 
  background-color: ${({ disabled }) =>
    disabled ? "#e2e8f0" : "white"}; 
  transition: all 0.3s;
  box-shadow: ${({ focused }) =>
    focused
      ? "0 0 0 2px rgba(55, 65, 81, 0.5)"
      : "none"}; 

  &::placeholder {
    color: #9ca3af; 
  }

  &:focus {
    border-color: #2563eb; 
  }

  ${({ hasFilter }) =>
    hasFilter &&
    `
    padding-right: 2rem; 
  `}
`;
