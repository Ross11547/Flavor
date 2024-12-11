const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.get("/insumo", async (req, res) => {
  try {
    const insumo = await prisma.insumo.findMany({});
    res.json({
      data: insumo,
      mensaje: "Insumos obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al traer los insumos",
      error: error.mensaje,
    });
  }
});

app.get("/insumo/:id", async (req, res) => {
  try {
    const insumo = await prisma.insumo.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (insumo) {
      res.json({
        data: insumo,
        mensaje: "Insumo obtenido correctamente",
      });
    } else {
      res.status(404).json({
        mensaje: "Insumo no encontrado",
      });
    }
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al traer el insumo",
      error: error.mensaje,
    });
  }
});

app.post("/insumo", async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      stockActual,
      unidadMedida,
      precioUnitario,
      estado,
    } = req.body;

    if (!nombre || !descripcion || !unidadMedida) {
      res.json({
        mensaje:
          "Los campos nombre, descripción y unidad de medida son obligatorios.",
      });
      return;
    }

    if (stockActual < 0) {
      res.json({
        mensaje: "El stock actual debe ser un número positivo.",
      });
      return;
    }

    if (precioUnitario <= 0) {
      res.json({
        mensaje: "El precio unitario debe ser mayor a 0.",
      });
      return;
    }
    const insumoCreado = await prisma.insumo.create({
      data: {
        nombre,
        descripcion,
        stockActual,
        unidadMedida,
        precioUnitario,
        estado,
      },
    });
    res.json({
      mensaje: "Insumo agregado correctamente",
      data: insumoCreado,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear insumo",
      error: error.mensaje,
    });
  }
});

app.put("/insumo/:id", async (req, res) => {
  try {
    const insumo = await prisma.insumo.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    res.json({
      mensaje: "Insumo actualizado correctamente",
      data: insumo,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar insumo",
      error: error.mensaje,
    });
  }
});

app.delete("/insumo/:id", async (req, res) => {
  try {
    const insumo = await prisma.insumo.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      mensaje: "Insumo eliminado correctamente",
      data: insumo,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar insumo",
      error: error.mensaje,
    });
  }
});

module.exports = app;
