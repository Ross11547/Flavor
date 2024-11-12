const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.get('/proveedor', async (req, res) => {
    try {
        const proveedores = await prisma.proveedor.findMany();
        res.json({
            data: proveedores,
            mensaje: "Proveedores obtenidos correctamente"
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al traer los proveedores",
            error: error.mensaje
        });
    }
});

app.get('/proveedor/:id', async (req, res) => {
    try {
        const proveedor = await prisma.proveedor.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        if (proveedor) {
            res.json({
                data: proveedor,
                mensaje: "Proveedor obtenido correctamente"
            });
        } else {
            res.status(404).json({ mensaje: "Proveedor no encontrado" });
        }
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al traer el proveedor",
            error: error.mensaje
        });
    }
});

app.post("/proveedor", async (req, res) => {
    try {
        const { nombre, descripcion, stockMinimo, telefono, correo, direccion } = req.body;

        if (!nombre || !descripcion || !correo || !direccion) {
            res.json({
                 mensaje: "Este campo es obligatorio." 
                });
            return;
        }

        if (telefono < 10000000 || telefono > 99999999) {
            res.json({
                mensaje: "El teléfono debe ser un número válido con exactamente 8 dígitos."
            });
            return;
        }

        if (stockMinimo < 30 || stockMinimo > 300) {
            res.json({
                mensaje: "El stock mínimo debe ser mayor a 30 y menor que 300."
            });
            return;
        }

        const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correoValido.test(correo)) {
            res.json({
                mensaje: "El correo debe tener un formato válido."
            });
            return;
        }
        const provCreado = await prisma.proveedor.create({
            data: {
                nombre,
                descripcion,
                stockMinimo,
                telefono,
                correo,
                direccion
            }
        });
        res.json({
            mensaje: "Proveedor agregado correctamente",
            data: provCreado
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al crear proveedor",
            error: error.mensaje
        });
    }
});

app.put("/proveedor/:id", async (req, res) => {
    try {
        const proveedor = await prisma.proveedor.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        });

        res.json({
            mensaje: "Proveedor actualizado correctamente",
            data: proveedor
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al actualizar proveedor",
            error: error.mensaje
        });
    }
});

app.delete("/proveedor/:id", async (req, res) => {
    try {
        const proveedor = await prisma.proveedor.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        res.json({
            mensaje: "Proveedor eliminado correctamente",
            data: proveedor
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar proveedor",
            error: error.mensaje
        });
    }
});

module.exports = app;
