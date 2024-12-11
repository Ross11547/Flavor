import React, { useState } from "react";
import { FilePen, Search } from "lucide-react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import {
  Button,
  ButtonGroup,
  Table,
  TableContainer,
  TableHeader,
  Td,
  Th,
} from "../../../style/styleCrud";
import { useGet } from "../../../hook/useGet";
import { ventasData } from "../../../data/ventasdata";

const Factura = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: ventas } = useGet("venta");
  const datoFactura = {
    numeroFactura: "F123456",
    fechaEmision: "2024-12-11",
    cliente: {
      nombre: "Juan Pérez",
      direccion: "Calle Ficticia 123, Cochabamba, Bolivia",
      telefono: "+591 12345678",
      nit: "1234567890",
    },
    detalleVenta: [
      {
        producto: "Producto 1",
        cantidad: 2,
        precioUnitario: 150.0,
        subtotal: 300.0,
      },
      {
        producto: "Producto 2",
        cantidad: 1,
        precioUnitario: 100.0,
        subtotal: 100.0,
      },
      {
        producto: "Producto 3",
        cantidad: 3,
        precioUnitario: 50.0,
        subtotal: 150.0,
      },
    ],
    totales: {
      subtotal: 550.0,
      impuestos: 55.0,
      total: 605.0,
    },
    metodoPago: "Efectivo",
    tipoVenta: "Venta normal",
    descuento: 0,
  };

  const generatePDFDocument = (facturaData) => {
    const styles = StyleSheet.create({
      page: {
        flexDirection: "column",
        padding: 30,
        backgroundColor: "#f8f8f8",
      },
      header: {
        fontSize: 28,
        textAlign: "center",
        marginBottom: 20,
        fontWeight: "bold",
        color: "#2E3A59",
      },
      subHeader: {
        fontSize: 18,
        marginTop: 15,
        fontWeight: "bold",
        color: "#2E3A59",
      },
      text: {
        fontSize: 12,
        marginBottom: 8,
        color: "#333",
      },
      boldText: {
        fontWeight: "bold",
        color: "#333",
      },
      table: {
        display: "table",
        width: "100%",
        borderCollapse: "collapse",
        marginTop: 20,
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: 8,
      },
      tableRow: {
        flexDirection: "row",
        borderBottom: "1px solid #ddd",
        padding: 10,
      },
      tableCell: {
        flex: 1,
        padding: 8,
        fontSize: 12,
        textAlign: "center",
        color: "#333",
      },
      tableHeaderCell: {
        backgroundColor: "#f1f1f1",
        fontWeight: "bold",
        fontSize: 14,
        color: "#2E3A59",
        textAlign: "center",
      },
      totalRow: {
        marginTop: 15,
        textAlign: "right",
      },
      footer: {
        marginTop: 20,
        textAlign: "center",
        fontSize: 12,
        color: "#888",
      },
      border: {
        borderBottom: "2px solid #2E3A59",
        paddingBottom: 5,
        marginBottom: 20,
      },
    });

    return (
      <Document>
        <Page style={styles.page}>
          <Text style={styles.header}>Factura N° {facturaData?.numeroFactura}</Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}>Fecha de emisión:</Text>{" "}
            {facturaData?.fechaEmision}
          </Text>

          <Text style={styles.subHeader}>Datos del Cliente</Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}>Nombre:</Text> {facturaData?.cliente.nombre}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}>Dirección:</Text> {facturaData?.cliente.direccion}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}>Teléfono:</Text> {facturaData?.cliente.telefono}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}>NIT:</Text> {facturaData?.cliente.nit}
          </Text>

          <View style={styles.border} />
          
          <Text style={styles.subHeader}>Detalle de la Venta</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeaderCell}>Producto</Text>
              <Text style={styles.tableHeaderCell}>Cantidad</Text>
              <Text style={styles.tableHeaderCell}>Precio Unitario</Text>
              <Text style={styles.tableHeaderCell}>Subtotal</Text>
            </View>
            {facturaData?.detalleVenta?.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.tableCell}>{item.producto}</Text>
                <Text style={styles.tableCell}>{item.cantidad}</Text>
                <Text style={styles.tableCell}>{item.precioUnitario.toFixed(2)}</Text>
                <Text style={styles.tableCell}>{item.subtotal.toFixed(2)}</Text>
              </View>
            ))}
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.text}>
              <Text style={styles.boldText}>Subtotal:</Text>{" "}
              {facturaData?.totales?.subtotal.toFixed(2)}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.boldText}>Impuestos:</Text>{" "}
              {facturaData?.totales?.impuestos.toFixed(2)}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.boldText}>Total:</Text>{" "}
              {facturaData?.totales?.total.toFixed(2)}
            </Text>
          </View>

          <Text style={styles.footer}>¡Gracias por su compra!</Text>
        </Page>
      </Document>
    );
  };

  return (
    <div>
      <ButtonGroup>
        <Button variant="secondary" onClick={() => alert("PDF generado!")}>
          <FilePen size={20} />
          Generar PDF
        </Button>
      </ButtonGroup>

      <TableContainer>
       

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
              <Th>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {ventasData?.facturas?.data?.map((venta, i) => (
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
                <Td>
                  <PDFDownloadLink
                    document={generatePDFDocument(datoFactura)}
                    fileName={`Factura_${venta.numeroFactura}.pdf`}
                  >
                    {({ loading }) =>
                      loading ? "Generando..." : "Descargar Factura"
                    }
                  </PDFDownloadLink>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Factura;
