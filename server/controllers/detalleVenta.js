const express = require('express')
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.get("/detalleVenta", async (req, res) => {
    try {
        const detallesVenta = await prisma.detalleVenta.findMany({});
        res.json({
            data: detallesVenta,
            mensaje: "Detalles de venta obtenidos correctamente",
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al traer los detalles de venta",
            error: error.mensaje
        });
    }
});

app.get("/detalleVenta/:id", async (req, res) => {
    try {
        const detalleVenta = await prisma.detalleVenta.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        res.json({
            data: detalleVenta,
            mensaje: "Detalle de venta obtenido correctamente",
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al traer el detalle de venta",
            error: error.mensaje
        });
    }
});

app.post("/detalleVenta", async (req, res) => {
    try {
        const { cantidad, precioUnitario, subTotal, idVenta, idProducto } = req.body;

        if (!cantidad || cantidad <= 0 || !precioUnitario || precioUnitario <= 0 || !subTotal || subTotal <= 0) {
            return res.json({
                mensaje: "Todos los campos son obligatorios y deben ser mayores a cero."
            });
        }

        const detalleVentaCompra = await prisma.detalleVenta.create({
            data: {
                cantidad,
                precioUnitario,
                subTotal,
                idVenta,
                idProducto
            }
        });

        res.json({
            data: detalleVentaCompra,
            mensaje: "Detalle de venta creado correctamente",
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al crear el detalle de venta",
            error: error.mensaje
        });
    }
});

app.put("/detalleVenta/:id", async (req, res) => {
    try {
        const detalleVenta = await prisma.detalleVenta.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        });
        res.json({
            data: detalleVenta,
            mensaje: "Detalle de venta actualizado correctamente",
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al actualizar el detalle de venta",
            error: error.mensaje
        });
    }
});

app.delete("/detalleVenta/:id", async (req, res) => {
    try {
        const detalleVenta = await prisma.detalleVenta.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        res.json({
            data: detalleVenta,
            mensaje: "Detalle de venta eliminado correctamente",
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar el detalle de venta",
            error: error.mensaje
        });
    }
});

module.exports = app;