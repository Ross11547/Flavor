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
import { usePost } from "../../../hook/usePost";
import { useUpdate } from "../../../hook/usePut";
import { useDelete } from "../../../hook/useDelete";
const Sucursal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentData, setCurrentItem] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    dereccion: "",
  });
  const { data: sucursal, reload } = useGet("sucursal");
  const { postData } = usePost("sucursal");
  const { updateData } = useUpdate("sucursal");
  const { deleteData } = useDelete("sucursal");

  useEffect(() => {
    if (currentData) {
      setForm({
        nombre: currentData.nombre,
        telefono: currentData.telefono,
        correo: currentData.correo,
        dereccion: currentData.dereccion,
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
      head: [["ID", "Nombre", "telefono", "Correo", "Direccion"]],
      body: sucursal.map((item) => [
        item.id,
        item.nombre,
        item.telefono,
        item.correo,
        item.dereccion,
      ]),
    });
    doc.save("sucursal.pdf");
  };
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(sucursal);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "sucursal");
    XLSX.writeFile(wb, "sucursal.xlsx");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentData) {
      await updateData(currentData.id, form);
      reload();
    } else {
      await postData(form);
      reload();
    }
    setIsFormOpen(false);
    setCurrentItem(null);
    setForm({
      nombre: "",
      telefono: "",
      correo: "",
      dereccion: "",
    });
  };
  const handleDelete = async (id) => {
    await deleteData(id);
    reload();
  };
  const filteredItems = sucursal?.data?.filter((user) =>
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
              placeholder="Buscar sucursal..."
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
              <Th>Telefono</Th>
              <Th>Correo</Th>
              <Th>Direccion</Th>
              <Th>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {filteredItems?.map((item, i) => (
              <tr key={i}>
                <Td>{i + 1}</Td>
                <Td>{item.nombre}</Td>
                <Td>{item.telefono}</Td>
                <Td>{item.correo}</Td>
                <Td>{item.dereccion}</Td>
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
            {currentData ? "Editar sucursal" : "Nuevo sucursal"}
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
            <Label>Telefono</Label>
            <Input
              type="number"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              placeholder="Telefono"
            />
          </FormGroup>
          <FormGroup>
            <Label>Correo</Label>
            <Input
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              placeholder="Correo"
            />
          </FormGroup>
          <FormGroup>
            <Label>Direccion</Label>
            <Input
              type="text"
              name="dereccion"
              value={form.dereccion}
              onChange={handleChange}
              placeholder="Direccion"
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

export default Sucursal;
