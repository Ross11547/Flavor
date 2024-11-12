const express = require('express')
const { PrismaClient } = require('@prisma/client');

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
            error: error.mensaje
        });
    }
});

app.get("/producto/:id", async (req, res) => {
    try {
        const producto = await prisma.producto.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        res.json({
            data: producto,
            mensaje: "Producto obtenido correctamente",
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al traer el producto",
            error: error.mensaje
        });
    }
});

app.post("/producto", async (req, res) => {
    try {
        const { nombre, precioVenta, stockActual, StockMinimo, unidadMedida, estado, idCategoria } = req.body;

        if (nombre === '' || precioVenta === '' || unidadMedida === '' || idCategoria === null) {
            return res.json({
                mensaje: "Todos los campos son obligatorios."
            });
        }

        const produCreado = await prisma.producto.create({
            data: {
                nombre,
                precioVenta,
                stockActual,
                StockMinimo,
                unidadMedida,
                estado,
                idCategoria
            }
        });

        res.json({
            data: produCreado,
            mensaje: "Producto creado correctamente",
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al crear el producto",
            error: error.mensaje
        });
    }
});

app.put("/producto/:id", async (req, res) => {
    try {
        const producto = await prisma.producto.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        });
        res.json({
            data: producto,
            mensaje: "Producto actualizado correctamente",
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al actualizar el producto",
            error: error.mensaje
        });
    }
});

app.delete("/producto/:id", async (req, res) => {
    try {
        const producto = await prisma.producto.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        res.json({
            data: producto,
            mensaje: "Producto eliminado correctamente",
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar el producto",
            error: error.mensaje
        });
    }
});

module.exports = app;