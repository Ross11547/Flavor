const express = require('express')
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.get("/venta", async (req, res) => {
    try {
        const venta = await prisma.venta.findMany({});
        res.json({
            data: venta,
            mensaje: "Ventas obtenidas correctamente",
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al traer las ventas",
            error: error.mensaje
        });
    }
});

app.get("/venta/:id", async (req, res) => {
    try {
        const venta = await prisma.venta.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        res.json({
            data: venta,
            mensaje: "Venta obtenida correctamente",
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al traer la venta",
            error: error.mensaje
        });
    }
});

app.post("/venta", async (req, res) => {
    try {
        const { fechaVenta, totalVenta, metodoPago, tipoVenta, idCliente, idUsuario } = req.body;

        if (fechaVenta === '' || totalVenta === '' || metodoPago === '' || tipoVenta === '' || idCliente === null || idUsuario === null) {
            return res.json({
                mensaje: "Todos los campos son obligatorios."
            });
        }

        const ventaCreada = await prisma.venta.create({
            data: {
                fechaVenta,
                totalVenta,
                metodoPago,
                tipoVenta,
                idCliente,
                idUsuario
            }
        });

        res.json({
            data: ventaCreada,
            mensaje: "Venta creada correctamente",
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al crear la venta",
            error: error.mensaje
        });
    }
});

app.put("/venta/:id", async (req, res) => {
    try {
        const venta = await prisma.venta.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        });
        res.json({
            data: venta,
            mensaje: "Venta actualizada correctamente",
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al actualizar la venta",
            error: error.mensaje
        });
    }
});

app.delete("/venta/:id", async (req, res) => {
    try {
        const venta = await prisma.venta.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        res.json({
            data: venta,
            mensaje: "Venta eliminada correctamente",
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar la venta",
            error: error.mensaje
        });
    }
});

module.exports = app;