export const ventasData = {
  ventas: {
    data: [
      {
        id: 1,
        fechaVenta: "2024-12-10T10:30:00.000Z",
        cliente: {
          nit: 12345678,
          nombre: "Juan Pérez",
        },
        totalVenta: 500,
        metodoPago: "Tarjeta de Crédito",
        descuento: 50,
        tipoVenta: "Online",
        usuario: {
          id: 1,
          nombre: "Admin User",
        },
      },
      {
        id: 2,
        fechaVenta: "2024-12-11T15:45:00.000Z",
        cliente: {
          nit: 87654321,
          nombre: "María Gómez",
        },
        totalVenta: 300,
        metodoPago: "Efectivo",
        descuento: null,
        tipoVenta: "Presencial",
        usuario: {
          id: 2,
          nombre: "Sales Manager",
        },
      },
      {
        id: 3,
        fechaVenta: "2024-12-09T08:15:00.000Z",
        cliente: {
          nit: 11223344,
          nombre: "Carlos López",
        },
        totalVenta: 1000,
        metodoPago: "Transferencia Bancaria",
        descuento: 100,
        tipoVenta: "Online",
        usuario: {
          id: 3,
          nombre: "Vendor Assistant",
        },
      },
    ],
  },
  pedidos: {
    data: [
      {
        id: 101,
        fechaPedido: "2024-12-08T14:00:00.000Z",
        cliente: {
          nit: 12345678,
          nombre: "Juan Pérez",
        },
        estado: "Pendiente",
        totalPedido: 200,
      },
      {
        id: 102,
        fechaPedido: "2024-12-09T11:30:00.000Z",
        cliente: {
          nit: 87654321,
          nombre: "María Gómez",
        },
        estado: "Completado",
        totalPedido: 400,
      },
      {
        id: 103,
        fechaPedido: "2024-12-10T09:45:00.000Z",
        cliente: {
          nit: 11223344,
          nombre: "Carlos López",
        },
        estado: "Cancelado",
        totalPedido: 150,
      },
    ],
  },
  facturas: {
    data: [
      {
        id: 1,
        fechaFactura: "2024-12-10T10:45:00.000Z",
        cliente: {
          nit: 12345678,
          nombre: "Juan Pérez",
        },
        totalFactura: 500,
        metodoPago: "Tarjeta de Crédito",
      }
    ],
  },
};
