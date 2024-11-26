const express = require('express')
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.get("/sucursal", async (req, res) => {
    try {
        const sucursal = await prisma.sucursal.findMany({});
        res.json({
            data: sucursal,
            mensaje: "Sucursales obtenidas correctamente",
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al traer las sucursales",
            error: error.mensaje,
        });
    }
});

app.get("/sucursal/:id", async (req, res) => {
    try {
        const sucursal = await prisma.sucursal.findUnique({
            where: {
                id: Number(req.params.id)
            },
        });
        if (sucursal) {
            res.json({
                data: sucursal,
                mensaje: "Sucursal obtenida correctamente",
            });
        } else {
            res.status(404).json({
                mensaje: "Sucursal no encontrada",
            });
        }
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al traer la sucursal",
            error: error.mensaje,
        });
    }
});

app.post("/sucursal", async (req, res) => {
    try {
        const { nombre, telefono, correo, dereccion } = req.body;

        if (!nombre || !dereccion) {
            res.json({
                mensaje: "Los campos nombre y dirección son obligatorios.",
            });
            return;
        }

        const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correo || !correoValido.test(correo)) {
            res.json({
                mensaje: "El correo debe tener un formato válido.",
            });
            return;
        }
        const sucuCreada = await prisma.sucursal.create({
            data: {
                nombre,
                telefono,
                correo,
                dereccion,
            },
        });
        res.json({
            mensaje: "Sucursal agregada correctamente",
            data: sucuCreada,
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al crear la sucursal",
            error: error.mensaje,
        });
    }
});

app.put("/sucursal/:id", async (req, res) => {
    try {
        const sucursalActualizada = await prisma.sucursal.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body,
        });
        res.json({
            mensaje: "Sucursal actualizada correctamente",
            data: sucursalActualizada,
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al actualizar la sucursal",
            error: error.mensaje,
        });
    }
});

app.delete("/sucursal/:id", async (req, res) => {
    try {
        const sucursalEliminada = await prisma.sucursal.delete({
            where: {
                id: Number(req.params.id)
            },
        });
        res.json({
            mensaje: "Sucursal eliminada correctamente",
            data: sucursalEliminada,
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar la sucursal",
            error: error.mensaje,
        });
    }
});

module.exports = app;