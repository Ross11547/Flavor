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
const Cliente = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentData, setCurrentItem] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    nit: "",
    telefono: "",
    correo: "",
    direccion: "",
    puntosFidelizacion: "0",
  });
  const { data: cliente, reload } = useGet("cliente");
  const { postData } = usePost("cliente");
  const { updateData } = useUpdate("cliente");
  const { deleteData } = useDelete("cliente");

  useEffect(() => {
    if (currentData) {
      setForm({
        nombre: currentData.nombre,
        nit: currentData.nit,
        telefono: currentData.telefono,
        correo: currentData.correo,
        direccion: currentData.direccion,
        puntosFidelizacion: currentData.puntosFidelizacion,
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
          "Nit",
          "Nombre",
          "telefono",
          "Correo",
          "Direccion",
          "Puntos Fidelizacion",
        ],
      ],
      body: cliente.map((item) => [
        item.nit,
        item.nombre,
        item.telefono,
        item.correo,
        item.direccion,
        item.puntosFidelizacion,
      ]),
    });
    doc.save("cliente.pdf");
  };
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(cliente);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "cliente");
    XLSX.writeFile(wb, "cliente.xlsx");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentData) {
      const nit = parseInt(currentData.nit);
      console.log(form);
      await updateData(nit, {
        ...form,
        puntosFidelizacion: parseInt(form.puntosFidelizacion),
        nit: parseInt(form.nit),
      });
      reload();
    } else {
      console.log({
        ...form,
        puntosFidelizacion: parseInt(form.puntosFidelizacion),
        nit: parseInt(form.nit),
      });
      await postData({
        ...form,
        puntosFidelizacion: parseInt(form.puntosFidelizacion),
        nit: parseInt(form.nit),
      });
      reload();
    }
    setIsFormOpen(false);
    setCurrentItem(null);
    setForm({
      nit: "",
      nombre: "",
      telefono: "",
      correo: "",
      direccion: "",
      puntosFidelizacion: "0",
    });
  };
  const handleDelete = async (nit) => {
    const id = parseInt(nit);
    await deleteData(id);
    reload();
  };
  const filteredItems = cliente?.data?.filter((user) =>
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <PageContainer>
      <TableContainer>
        <TableHeader>
          <SearchContainer>
            <Search size={20} />
            <input
              type="text"
              placeholder="Buscar cliente..."
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
              <Th>Nit</Th>
              <Th>Nombre</Th>
              <Th>Telefono</Th>
              <Th>Correo</Th>
              <Th>Puntos Fidelizacion</Th>
              <Th>Direccion</Th>
              <Th>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {filteredItems?.map((item, i) => (
              <tr key={i}>
                <Td>{i + 1}</Td>
                <Td>{item.nit}</Td>
                <Td>{item.nombre}</Td>
                <Td>{item.telefono}</Td>
                <Td>{item.correo}</Td>
                <Td>{item.puntosFidelizacion}</Td>
                <Td>{item.direccion}</Td>
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
                      onClick={() => handleDelete(item.nit)}
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
            {currentData ? "Editar cliente" : "Nuevo cliente"}
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
            <Label>Nit</Label>
            <Input
              type="text"
              name="nit"
              value={form.nit}
              onChange={handleChange}
              placeholder="Nit"
            />
          </FormGroup>
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
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              placeholder="Direccion"
            />
          </FormGroup>
          <FormGroup>
            <Label>Punto de fidelidad</Label>
            <Input
              type="number"
              name="puntosFidelizacion"
              value={form.puntosFidelizacion}
              onChange={handleChange}
              placeholder="Puntos de fidelidadd"
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

export default Cliente;
