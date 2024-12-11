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
import { ventasData } from "../../../data/ventasdata";

const Venta = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentData, setCurrentItem] = useState(null);

  const [form, setForm] = useState({
    fechaVenta: "",
    totalVenta: "",
    metodoPago: "",
    descuento: "",
    tipoVenta: "",
    idCliente: "",
    idUsuario: "",
    productos: [], // Detalles de los productos en la venta
  });

  const { data: ventas, reload } = useGet("venta");
  const { postData } = usePost("venta");
  const { updateData } = useUpdate("venta");
  const { deleteData } = useDelete("venta");
  const { data: productos } = useGet("producto");

  useEffect(() => {
    if (currentData) {
      setForm({
        fechaVenta: currentData.fechaVenta,
        totalVenta: currentData.totalVenta,
        metodoPago: currentData.metodoPago,
        descuento: currentData.descuento,
        tipoVenta: currentData.tipoVenta,
        idCliente: currentData.idCliente,
        idUsuario: currentData.idUsuario,
        productos: currentData.detalleVenta,
      });
    }
  }, [currentData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleProductChange = (e, index) => {
    const { name, value } = e.target;
    const updatedProducts = form.productos.map((product, idx) =>
      idx === index ? { ...product, [name]: value } : product
    );
    setForm({ ...form, productos: updatedProducts });
  };

  const addProduct = () => {
    setForm({
      ...form,
      productos: [
        ...form.productos,
        { idProducto: "", cantidad: "", precioUnitario: "", subTotal: "" },
      ],
    });
  };

  const removeProduct = (index) => {
    const updatedProducts = form.productos.filter((_, idx) => idx !== index);
    setForm({ ...form, productos: updatedProducts });
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [
        [
          "ID",
          "Fecha",
          "Cliente",
          "Método de Pago",
          "Total",
          "Descuento",
          "Tipo de Venta",
        ],
      ],
      body: ventas.map((venta) => [
        venta.id,
        venta.fechaVenta,
        venta.cliente.nombre,
        venta.metodoPago,
        venta.totalVenta,
        venta.descuento,
        venta.tipoVenta,
      ]),
    });
    doc.save("ventas.pdf");
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(ventas);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Ventas");
    XLSX.writeFile(wb, "ventas.xlsx");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      totalVenta: parseFloat(form.totalVenta),
      descuento: form.descuento ? parseFloat(form.descuento) : 0,
      productos: form.productos.map((product) => ({
        idProducto: parseInt(product.idProducto),
        cantidad: parseInt(product.cantidad),
        precioUnitario: parseFloat(product.precioUnitario),
        subTotal: parseFloat(product.subTotal),
      })),
    };

    if (currentData) {
      await updateData(currentData.id, payload);
      reload();
    } else {
      await postData(payload);
      reload();
    }
    setIsFormOpen(false);
    setCurrentItem(null);
    setForm({
      fechaVenta: "",
      totalVenta: "",
      metodoPago: "",
      descuento: "",
      tipoVenta: "",
      idCliente: "",
      idUsuario: "",
      productos: [],
    });
  };

  const handleDelete = async (id) => {
    await deleteData(id);
    reload();
  };


  return (
    <PageContainer>
      <TableContainer>
        <TableHeader>
          <SearchContainer>
            <Search size={20} />
            <input
              type="text"
              placeholder="Buscar venta..."
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
              <Th>ID</Th>
              <Th>Fecha</Th>
              <Th>Cliente</Th>
              <Th>Total</Th>
              <Th>Método de Pago</Th>
              <Th>Descuento</Th>
              <Th>Tipo de Venta</Th>
              <Th>Usuario</Th>
              <Th>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {ventasData?.ventas?.data?.map((venta, i) => (
              <tr key={i}>
                <Td>{venta.id}</Td>
                <Td>{new Date(venta.fechaVenta).toLocaleDateString()}</Td>
                <Td>{venta.cliente?.nombre}</Td>
                <Td>{venta.totalVenta} Bs</Td>
                <Td>{venta.metodoPago}</Td>
                <Td>
                  {venta.descuento ? `${venta.descuento} Bs` : "Sin descuento"}
                </Td>
                <Td>{venta.tipoVenta}</Td>
                <Td>{venta.usuario?.nombre}</Td>
                <Td>
                  <ActionButtons>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setCurrentItem(venta);
                        setIsFormOpen(true);
                      }}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(venta.id)}
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
          <FormTitle>{currentData ? "Editar venta" : "Nueva venta"}</FormTitle>
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
            <Label>Fecha de venta</Label>
            <Input
              type="date"
              name="fechaVenta"
              value={form.fechaVenta}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Total de venta</Label>
            <Input
              type="number"
              name="totalVenta"
              value={form.totalVenta}
              onChange={handleChange}
              placeholder="Total"
            />
          </FormGroup>
          <FormGroup>
            <Label>Método de pago</Label>
            <Input
              type="text"
              name="metodoPago"
              value={form.metodoPago}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Descuento</Label>
            <Input
              type="number"
              name="descuento"
              value={form.descuento}
              onChange={handleChange}
              placeholder="Descuento"
            />
          </FormGroup>
          <FormGroup>
            <Label>Tipo de venta</Label>
            <Input
              type="text"
              name="tipoVenta"
              value={form.tipoVenta}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Cliente</Label>
            <InputSelect
              name="idCliente"
              value={form.idCliente}
              onChange={handleChange}
            >
              {productos?.data?.map((producto) => (
                <option key={producto.id} value={producto.id}>
                  {producto.nombre}
                </option>
              ))}
            </InputSelect>
          </FormGroup>
          <FormGroup>
            <Label>Productos</Label>
            {form.productos.map((product, index) => (
              <div key={index}>
                <InputSelect
                  name="idProducto"
                  value={product.idProducto}
                  onChange={(e) => handleProductChange(e, index)}
                >
                  {productos?.data?.map((producto) => (
                    <option key={producto.id} value={producto.id}>
                      {producto.nombre}
                    </option>
                  ))}
                </InputSelect>
                <Input
                  type="number"
                  name="cantidad"
                  value={product.cantidad}
                  onChange={(e) => handleProductChange(e, index)}
                  placeholder="Cantidad"
                />
                <Input
                  type="number"
                  name="precioUnitario"
                  value={product.precioUnitario}
                  onChange={(e) => handleProductChange(e, index)}
                  placeholder="Precio unitario"
                />
                <Input
                  type="number"
                  name="subTotal"
                  value={product.subTotal}
                  onChange={(e) => handleProductChange(e, index)}
                  placeholder="Subtotal"
                />
                <Button variant="danger" onClick={() => removeProduct(index)}>
                  Eliminar producto
                </Button>
              </div>
            ))}
            <Button variant="primary" onClick={addProduct}>
              Agregar producto
            </Button>
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

export default Venta;
