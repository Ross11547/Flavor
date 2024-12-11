const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.get("/producto", async (req, res) => {
  try {
    const producto = await prisma.producto.findMany({});
    res.json({
      data: producto,
      mensaje: "Productos obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al traer los productos",
      error: error.mensaje,
    });
  }
});

app.get("/producto/:id", async (req, res) => {
  try {
    const producto = await prisma.producto.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      data: producto,
      mensaje: "Producto obtenido correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al traer el producto",
      error: error.mensaje,
    });
  }
});

app.post("/producto", async (req, res) => {
    try {
      const {
        nombre,
        precioVenta,
        stockActual,
        stockMinimo,
        unidadMedida,
        estado,
        idCategoria,
      } = req.body;
  
      // Conversión de los valores al tipo esperado
      const data = {
        nombre: String(nombre),
        precioVenta: parseFloat(precioVenta), // Convertir a número decimal
        stockActual: parseInt(stockActual, 10), // Convertir a entero
        stockMinimo: parseInt(stockMinimo, 10), // Convertir a entero
        unidadMedida: String(unidadMedida),
        estado: estado === "true" || estado === true, // Convertir a booleano
        idCategoria: parseInt(idCategoria, 10), // Convertir a entero
      };
  
      // Validación básica después de la conversión
      if (
        !data.nombre ||
        isNaN(data.precioVenta) ||
        isNaN(data.stockActual) ||
        isNaN(data.stockMinimo) ||
        !data.unidadMedida ||
        typeof data.estado !== "boolean" ||
        isNaN(data.idCategoria)
      ) {
        return res.status(400).json({
          mensaje:
            "Datos inválidos. Asegúrate de enviar todos los campos requeridos con el tipo correcto.",
        });
      }
  
      // Crear el producto
      const produCreado = await prisma.producto.create({
        data,
      });
  
      res.status(201).json({
        data: produCreado,
        mensaje: "Producto creado correctamente",
      });
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al crear el producto",
        error: error.message || "Error inesperado",
      });
    }
  });
  

  app.put("/producto/:id", async (req, res) => {
    try {
      const {
        nombre,
        precioVenta,
        stockActual,
        stockMinimo,
        unidadMedida,
        estado,
        idCategoria,
      } = req.body;
  
      // Conversión de los valores al tipo esperado
      const data = {
        nombre: nombre ? String(nombre) : undefined,
        precioVenta: precioVenta !== undefined ? parseFloat(precioVenta) : undefined,
        stockActual: stockActual !== undefined ? parseInt(stockActual, 10) : undefined,
        stockMinimo: stockMinimo !== undefined ? parseInt(stockMinimo, 10) : undefined,
        unidadMedida: unidadMedida ? String(unidadMedida) : undefined,
        estado: estado !== undefined ? estado === "true" || estado === true : undefined,
        idCategoria: idCategoria !== undefined ? parseInt(idCategoria, 10) : undefined,
      };
  
      // Validación después de la conversión (opcional si quieres asegurar todos los campos)
      if (
        (data.precioVenta !== undefined && isNaN(data.precioVenta)) ||
        (data.stockActual !== undefined && isNaN(data.stockActual)) ||
        (data.stockMinimo !== undefined && isNaN(data.stockMinimo)) ||
        (data.idCategoria !== undefined && isNaN(data.idCategoria))
      ) {
        return res.status(400).json({
          mensaje:
            "Datos inválidos. Asegúrate de enviar todos los campos requeridos con el tipo correcto.",
        });
      }
  
      // Actualizar el producto
      const producto = await prisma.producto.update({
        where: {
          id: Number(req.params.id),
        },
        data,
      });
  
      res.status(200).json({
        data: producto,
        mensaje: "Producto actualizado correctamente",
      });
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al actualizar el producto",
        error: error.message || "Error inesperado",
      });
    }
  });
  

app.delete("/producto/:id", async (req, res) => {
  try {
    const producto = await prisma.producto.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      data: producto,
      mensaje: "Producto eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el producto",
      error: error.mensaje,
    });
  }
});

module.exports = app;
