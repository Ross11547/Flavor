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
  ArrowUp,
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
} from "../style/styleCrud";
import { useGet } from "../hook/useGet";
import { usePost } from "../hook/usePost";
import { useUpdate } from "../hook/usePut";
import { useDelete } from "../hook/useDelete";

const Producto = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    precioVenta: "",
    stockActual: "",
    stockMinimo: "",
    unidadMedida: "",
    estado: true,
    idCategoria: "",
  });

  const { data: producto, reload } = useGet("producto");
  const { data: categoria } = useGet("categoria");

  const { postData } = usePost("producto");
  const { updateData } = useUpdate("producto");
  const { deleteData } = useDelete("producto");

  useEffect(() => {
    if (currentData) {
      setForm({
        nombre: currentData.nombre,
        precioVenta: currentData.precioVenta,
        stockActual: currentData.stockActual,
        stockMinimo: currentData.stockMinimo,
        unidadMedida: currentData.unidadMedida,
        estado: currentData.estado,
        idCategoria: currentData.idCategoria,
      });
    }
  }, [currentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "estado" ? e.target.checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentData) {
      await updateData(currentData.id, form);
      reload();
    } else {
      console.log(form);
      await postData(form);
      reload();
    }
    setIsFormOpen(false);
    setCurrentData(null);
    setForm({
      nombre: "",
      precioVenta: "",
      stockActual: "",
      stockMinimo: "",
      unidadMedida: "",
      estado: true,
      idCategoria: "",
    });
  };

  const handleDelete = async (id) => {
    await deleteData(id);
    reload();
  };

  const filteredItems = producto?.data?.filter((item) =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer>
      <TableContainer>
        <TableHeader>
          <SearchContainer>
            <Search size={20} />
            <input
              type="text"
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          <ButtonGroup>
            <Button variant="primary" onClick={() => setIsFormOpen(true)}>
              <Plus size={20} />
              Agregar
            </Button>
          </ButtonGroup>
        </TableHeader>
        <Table>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Nombre</Th>
              <Th>Precio Venta</Th>
              <Th>Stock Actual</Th>
              <Th>Stock Mínimo</Th>
              <Th>Unidad de Medida</Th>
              <Th>Estado</Th>
              <Th>Categoría</Th>
              <Th>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {filteredItems?.map((item, i) => (
              <tr key={i}>
                <Td>{i + 1}</Td>
                <Td>{item.nombre}</Td>
                <Td>{item.precioVenta} Bs</Td>
                <Td>{item.stockActual}</Td>
                <Td>{item.stockMinimo}</Td>
                <Td>{item.unidadMedida}</Td>
                <Td>{item.estado ? "Activo" : "Inactivo"}</Td>
                <Td>{item.idCategoria}</Td>
                <Td>
                  <ActionButtons>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setCurrentData(item);
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
            {currentData ? "Editar producto" : "Nuevo producto"}
          </FormTitle>
          <Button
            variant="secondary"
            onClick={() => {
              setIsFormOpen(false);
              setCurrentData(null);
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
            <Label>Precio Venta</Label>
            <Input
              type="number"
              name="precioVenta"
              value={form.precioVenta}
              onChange={handleChange}
              placeholder="Precio Venta"
            />
          </FormGroup>
          <FormGroup>
            <Label>Stock Actual</Label>
            <Input
              type="number"
              name="stockActual"
              value={form.stockActual}
              onChange={handleChange}
              placeholder="Stock Actual"
            />
          </FormGroup>
          <FormGroup>
            <Label>Stock Mínimo</Label>
            <Input
              type="number"
              name="stockMinimo"
              value={form.stockMinimo}
              onChange={handleChange}
              placeholder="Stock Mínimo"
            />
          </FormGroup>
          <FormGroup>
            <Label>Unidad de Medida</Label>
            <Input
              type="text"
              name="unidadMedida"
              value={form.unidadMedida}
              onChange={handleChange}
              placeholder="Unidad de Medida"
            />
          </FormGroup>
          <FormGroup>
            <Label>Estado</Label>
            <input
              type="checkbox"
              name="estado"
              checked={form.estado}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Categoría</Label>
            <InputSelect
              name="idCategoria"
              value={form.idCategoria}
              onChange={handleChange}
            >
              <option value="">Seleccione una categoría</option>
              {categoria?.data?.map((v, i) => (
                <option key={i} value={v.id}>
                  {v.nombre}
                </option>
              ))}
            </InputSelect>
          </FormGroup>
          <ButtonGroup>
            <Button type="submit" variant="primary">
              <Save size={20} /> Guardar
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsFormOpen(false);
                setCurrentData(null);
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

export default Producto;
