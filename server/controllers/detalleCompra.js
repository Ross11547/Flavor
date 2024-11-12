const express = require('express')
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.get("/detalleCompra", async (req, res) => {
    try {
      const detalleCompra = await prisma.detalleCompra.findMany({});
      res.json({
        data: detalleCompra,
        mensaje: "Detalles de compra obtenidos correctamente",
      });
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al traer los detalles de compra",
        error: error.mensaje
      });
    }
  });
  
  app.post("/detalleCompra", async (req, res) => {
    try {
      const { cantidad, precioUnitario, subTotal, idCompra, idIngrediente, idInsumo } = req.body;
  
      if (!cantidad || cantidad <= 0 || !precioUnitario || precioUnitario <= 0 || !subTotal || subTotal <= 0) {
        return res.json({
          mensaje: "Todos los campos son obligatorios y deben ser mayores a cero."
        });
      }
  
      const detalleCompraCreado = await prisma.detalleCompra.create({
        data: { cantidad, 
            precioUnitario, 
            subTotal, 
            idCompra, 
            idIngrediente, 
            idInsumo }
      });
  
      res.json({
        data: detalleCompraCreado,
        mensaje: "Detalle de compra creado correctamente",
      });
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al crear el detalle de compra",
        error: error.mensaje
      });
    }
  });

  module.exports = app;