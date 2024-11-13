const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.get("/categoria", async (req, res) => {
  try {
    const categoria = await prisma.categoria.findMany();
    if (categoria) {
      res,
        json({
          data: categoria,
          mensaje: "Categorias obtenidos correctamente",
        });
    }
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al traer las categorías",
      error: error.mensaje,
    });
  }
});

app.get("/categoria/:id", async (req, res) => {
  try {
    const categoria = await prisma.categoria.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (categoria) {
      res.json({
        data: categoria,
        mensaje: "Categoria obtenida correctamente",
      });
    }
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al traer la categoría",
      error: error.mensaje,
    });
  }
});

app.post("/categoria", async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    if (nombre === "" || descripcion === "") {
      res.json({
        mensaje: "Este campo es obligatorio.",
      });
      return;
    }
    const cateCreada = await prisma.categoria.create({
      data: {
        nombre,
        descripcion,
      },
    });
    res.json({
      mensaje: "Categoria agregada correctamente",
      data: cateCreada,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear categoria",
      error: error.mensaje,
    });
  }
});

app.put("/categoria/:id", async (req, res) => {
  try {
    const categoria = await prisma.categoria.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    if (categoria) {
      res.json({
        data: categoria,
        mensaje: "categoria actualizado correctamente",
      });
    }
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar categoria",
      error: error.mensaje,
    });
  }
});

app.delete("/categoria/:id", async (req, res) => {
  try {
    const categoria = await prisma.categoria.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    if (categoria) {
      res.json({
        data: categoria,
        mensaje: "categoria eliminado correctamente",
      });
    }
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar categoria",
      error: error.mensaje,
    });
  }
});
module.exports = app;
