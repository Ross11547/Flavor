const express = require('express')
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.get("/ingrediente", async (req, res) => {
    try {
        const ingrediente = await prisma.ingrediente.findMany({});
        res.json({
            data: ingrediente,
            mensaje: "Ingredientes obtenidos correctamente",
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al traer los ingredientes",
            error: error.message,
        });
    }
});

app.get("/ingrediente/:id", async (req, res) => {
    try {
        const ingrediente = await prisma.ingrediente.findUnique({
            where: {
                id: Number(req.params.id)
            },
        });
        if(ingrediente){
            res.json({
                data: ingrediente,
                mensaje: "Ingredientes traido correctamente",
            })
        }
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al traer el ingrediente",
            error: error.message,
        });
    }
});

app.post("/ingrediente", async (req, res) => {
    try {
        const { nombre, descripcion, stockActual, unidadMedida, precioUnitario, estado } = req.body;

        if (!nombre || !descripcion || !unidadMedida || precioUnitario == null) {
            res.json({
                mensaje: "Todos los campos son obligatorios."
            });
            return;
        }

        if (stockActual < 0) {
            res.json({
                mensaje: "El stock debe ser mayor o igual a 0."
            });
            return;
        }

        if (precioUnitario <= 0) {
            res.json({
                mensaje: "El precio unitario debe ser mayor a 0."
            });
            return;
        }

        if (estado !== true && estado !== false) {
            res.json({
                mensaje: "El estado debe ser true o false."
            });
            return;
        }

        const ingreCreado = await prisma.ingrediente.create({
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
            mensaje: "Ingrediente agregado correctamente",
            data: ingreCreado,
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al crear ingrediente",
            error: error.message,
        });
    }
});

app.put("/ingrediente/:id", async (req, res) => {
    try {
        const ingrediente = await prisma.ingrediente.update({
            where: {
                id: Number(req.params.id),
            },
            data: req.body,
        });

        res.json({
            mensaje: "Ingrediente actualizado correctamente",
            data: ingrediente,
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al actualizar ingrediente",
            error: error.message,
        });
    }
});

app.delete("/ingrediente/:id", async (req, res) => {
    try {
        const ingrediente = await prisma.ingrediente.delete({
            where: {
                id: Number(req.params.id),
            },
        });

        res.json({
            mensaje: "Ingrediente eliminado correctamente",
            data: ingrediente,
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar ingrediente",
            error: error.message,
        });
    }
});

module.exports = app;