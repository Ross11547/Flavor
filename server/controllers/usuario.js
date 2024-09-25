const express = require('express')
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.get("/usuario", async (req, res) => {
  try {
    const usuario = await prisma.usuario.findMany({});
    if (usuario) {
      res.json({
        data: usuario,
        mensaje: "usuarios obtenidos correctamente",
      });
    }
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al traer los usuarios",
      error: error.mensaje
    });
  }
});

app.get("/usuario/:id", async (req, res) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: Number(req.params.id)
      }
    });
    if (usuario) {
      res.json({
        data: usuario,
        mensaje: "usuario obtenido correctamente",
      });
    }
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al traer el usuario",
      error: error.mensaje
    });
  }
});

app.post("/usuario", async (req, res) => {
  try {
    const { nombre, rol, telefono, correo, password, estado } = req.body;
    if (nombre === '' || rol === '') {
      res.json({
        mensaje: "Este campo es obligatorio."
      });
      return;
    }

    if (telefono < 10000000 || telefono > 99999999) {
      res.json({
        mensaje: "El teléfono es obligatorio y debe ser un número válido con exactamente 8 dígitos."
      });
      return;
    }

    if (estado !== true && estado !== false) {
      res.json({
        mensaje: "El estado es obligatorio y debe ser true o false."
      });
      return;
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo || !correoValido.test(correo)) {
      res.json({
        mensaje: "El correo es obligatorio y debe tener un formato válido."
      });
      return;
    }

    const usuarioExis = await prisma.usuario.findUnique({
      where: {
        correo: correo
      }
    });

    if (usuarioExis) {
      res.json({
        mensaje: "El correo que ingreso ya fue registrado."
      });
      return;
    }
    const usuarioCreado = await prisma.usuario.create({
      data: {
        nombre,
        rol,
        telefono,
        correo,
        password,
        estado
      }
    });
    res.json({
      mensaje: "Usuario agregado correctamente",
      data: usuarioCreado
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear usuario",
      error: error.mensaje
    });
  }
});

app.put("/usuario/:id", async (req, res) => {
  try {
    const usuario = await prisma.usuario.update({
      where: {
        id: Number(req.params.id)
      },
      data: req.body
    });
    if (usuario) {
      res.json({
        data: usuario,
        mensaje: "usuario actualizado correctamente"
      });
    }
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar usuario",
      error: error.mensaje
    });
  }
});

app.delete("/usuario/:id", async (req, res) => {
  try {
    const usuario = await prisma.usuario.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    if (usuario) {
      res.json({
        data: usuario,
        mensaje: "usuario eliminado correctamente",
      });
    }
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar usuario",
      error: error.mensaje
    });
  }
});

module.exports = app;