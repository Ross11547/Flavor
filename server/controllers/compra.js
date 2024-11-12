const express = require('express')
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.get("/compra", async (req, res) => {
    try {
      const compras = await prisma.compra.findMany({});
      res.json({
        data: compras,
        mensaje: "Compras obtenidas correctamente",
      });
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al traer las compras",
        error: error.mensaje
      });
    }
  });
  
  app.post("/compra", async (req, res) => {
    try {
      const { fechaCompra, totalCompra, idUsuario, idProveedor } = req.body;
  
      if (!fechaCompra || !totalCompra || !idUsuario || !idProveedor) {
        return res.json({
          mensaje: "Todos los campos son obligatorios."
        });
      }
  
      const nuevaCompra = await prisma.compra.create({
        data: { fechaCompra, totalCompra, idUsuario, idProveedor }
      });
  
      res.json({
        data: nuevaCompra,
        mensaje: "Compra creada correctamente",
      });
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al crear la compra",
        error: error.mensaje
      });
    }
  });

  module.exports = app;