const express = require('express')
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.get("/ingredienteProdu", async (req, res) => {
    try {
        const ingredienteProdu = await prisma.ingredienteProducto.findMany({});
        res.json({
            data: ingredienteProdu,
            mensaje: "Ingredientes de productos obtenidos correctamente",
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al traer los ingredientes de productos",
            error: error.mensaje
        });
    }
});

app.get("/ingredienteProdu/:id", async (req, res) => {
    try {
        const ingredienteProdu = await prisma.ingredienteProducto.findUnique({
            where: { id: Number(req.params.id) }
        });
        res.json({
            data: ingredienteProdu,
            mensaje: "Ingrediente de producto obtenido correctamente",
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al traer el ingrediente del producto",
            error: error.mensaje
        });
    }
});

app.post("/ingredienteProdu", async (req, res) => {
    try {
        const { cantidadIngrediente, idIngrediente, idProducto } = req.body;

        if (cantidadIngrediente === 0 || cantidadIngrediente <= 0 || idIngrediente === 0 || idProducto === 0) {
            return res.json({
                mensaje: "Todos los campos son obligatorios y la cantidad debe ser mayor a cero."
            });
        }

        const ingredienteProduCreado = await prisma.ingredienteProducto.create({
            data: {
                cantidadIngrediente,
                idIngrediente,
                idProducto
            }
        });

        res.json({
            data: ingredienteProduCreado,
            mensaje: "Ingrediente de producto creado correctamente",
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al crear el ingrediente de producto",
            error: error.mensaje
        });
    }
});

app.put("/ingredienteProdu/:id", async (req, res) => {
    try {
        const ingredienteProdu = await prisma.ingredienteProducto.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        });
        res.json({
            data: ingredienteProdu,
            mensaje: "Ingrediente de producto actualizado correctamente",
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al actualizar el ingrediente de producto",
            error: error.mensaje
        });
    }
});

app.delete("/ingredienteProdu/:id", async (req, res) => {
    try {
        const ingredienteProdu = await prisma.ingredienteProducto.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        res.json({
            data: ingredienteProdu,
            mensaje: "Ingrediente de producto eliminado correctamente",
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar el ingrediente de producto",
            error: error.mensaje
        });
    }
});

module.exports = app;