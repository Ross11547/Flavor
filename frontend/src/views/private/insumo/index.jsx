import React, { useState, useEffect } from "react";
import {
  FilePen,
  FileSpreadsheet,
  Plus,
  Search,
  Edit2,
  Trash2,
  Save,
  X,
} from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  ActionButtons,
  Button,
  ButtonGroup,
  FormContainer,
  FormGroup,
  FormHeader,
  FormTitle,
  Input,
  InputSelect,
  Label,
  PageContainer,
  SearchContainer,
  Table,
  TableContainer,
  TableHeader,
  Td,
  Th,
} from "../../../style/styleCrud";
import { useGet } from "../../../hook/useGet";
import { formatFecha } from "../../../utils/formatDate";
import { usePost } from "../../../hook/usePost";
import { useUpdate } from "../../../hook/usePut";
import { useDelete } from "../../../hook/useDelete";
import { fechaActual } from "../../../utils/dateDay";
const Insumo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentData, setCurrentItem] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    stockActual: "",
    unidadMedida: "",
    precioUnitario: "",
    estado: true,
  });
  const { data: insumo, reload } = useGet("insumo");
  const { postData } = usePost("insumo");
  const { updateData } = useUpdate("insumo");
  const { deleteData } = useDelete("insumo");

  useEffect(() => {
    if (currentData) {
      setForm({
        nombre: currentData.nombre,
        descripcion: currentData.descripcion,
        stockActual: currentData.stockActual,
        unidadMedida: currentData.unidadMedida,
        precioUnitario: currentData.precioUnitario,
        estado: currentData.estado,
      });
    }
  }, [currentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [
        [
          "ID",
          "Nombre",
          "Descripcion",
          "Cantidad",
          "Unidad de medida",
          "Precio unitario",
          "Estado",
        ],
      ],
      body: insumo.map((item) => [
        item.id,
        item.nombre,
        item.descripcion,
        item.stockActual,
        item.unidadMedida,
        item.precioUnitario,
        item.estado,
      ]),
    });
    doc.save("insumo.pdf");
  };
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(insumo);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Insumo");
    XLSX.writeFile(wb, "insumo.xlsx");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentData) {
      await updateData(currentData.id, form);
      reload();
    } else {
      console.log({
        ...form,
        stockActual: parseInt(form.stockActual, 50),
        precioUnitario: parseFloat(form.precioUnitario, 50),
      });
      await postData({
        ...form,
        stockActual: parseInt(form.stockActual, 50),
        precioUnitario: parseFloat(form.precioUnitario, 50),
      });
      reload();
    }
    setIsFormOpen(false);
    setCurrentItem(null);
    setForm({
      nombre: "",
      descripcion: "",
      stockActual: "",
      unidadMedida: "",
      precioUnitario: "",
      estado: true,
    });
  };
  const handleDelete = async (id) => {
    await deleteData(id);
    reload();
  };
  const filteredItems = insumo?.data?.filter((user) =>
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(filteredItems);
  return (
    <PageContainer>
      <TableContainer>
        <TableHeader>
          <SearchContainer>
            <Search size={20} />
            <input
              type="text"
              placeholder="Buscar insumo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          <ButtonGroup>
            <Button variant="secondary" onClick={exportToPDF}>
              <FilePen size={20} />
              PDF
            </Button>
            <Button variant="secondary" onClick={exportToExcel}>
              <FileSpreadsheet size={20} />
              Excel
            </Button>
            <Button variant="primary" onClick={() => setIsFormOpen(true)}>
              <Plus size={20} />
              Agregar
            </Button>
          </ButtonGroup>
        </TableHeader>

        <Table>
          <thead>
            <tr>
              <Th>Nro</Th>
              <Th>Nombre</Th>
              <Th>Descripcion</Th>
              <Th>Cantidad</Th>
              <Th>Unidad medida</Th>
              <Th>Precio</Th>
              <Th>Estado</Th>
              <Th>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {filteredItems?.map((item, i) => (
              <tr key={i}>
                <Td>{i + 1}</Td>
                <Td>{item.nombre}</Td>
                <Td>{item.descripcion}</Td>
                <Td>{item.stockActual}</Td>
                <Td>{item.unidadMedida}</Td>
                <Td>{item.precioUnitario}</Td>
                <Th>{item.estado ? "Activo" : "No esta activo"}</Th>
                <Td>
                  <ActionButtons>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setCurrentItem(item);
                        setIsFormOpen(true);
                      }}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </ActionButtons>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>

      <FormContainer isOpen={isFormOpen}>
        <FormHeader>
          <FormTitle>
            {currentData ? "Editar insumo" : "Nuevo insumo"}
          </FormTitle>
          <Button
            variant="secondary"
            onClick={() => {
              setIsFormOpen(false);
              setCurrentItem(null);
            }}
          >
            <X size={20} />
          </Button>
        </FormHeader>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Nombre</Label>
            <Input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre"
            />
          </FormGroup>
          <FormGroup>
            <Label>Descripcion</Label>
            <Input
              type="text"
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Descripcion"
            />
          </FormGroup>
          <FormGroup>
            <Label>Cantidad</Label>
            <Input
              type="number"
              name="stockActual"
              value={form.stockActual}
              onChange={handleChange}
              placeholder="Cantidad"
            />
          </FormGroup>
          <FormGroup>
            <Label>Precio</Label>
            <Input
              type="number"
              name="precioUnitario"
              value={form.precioUnitario}
              onChange={handleChange}
              placeholder="Precio"
            />
          </FormGroup>
          <FormGroup>
            <Label>Estado</Label>
            <Input
              type="checkbox"
              name="estado"
              value={form.estado}
              onChange={handleChange}
            />
          </FormGroup>
          <ButtonGroup>
            <Button type="submit" variant="primary">
              Guardar
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsFormOpen(false);
                setCurrentItem(null);
              }}
            >
              <X size={20} /> Cancelar
            </Button>
          </ButtonGroup>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default Insumo;
