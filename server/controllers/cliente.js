const express = require('express');
const { PrismaClient } = require('@prisma/client')

const app = express();
const prisma = new PrismaClient();

app.get("/cliente", async (req, res) => {
    try {
        const cliente = await prisma.cliente.findMany({});
        if (cliente) {
            res.json({
                data: cliente,
                mensaje: "clientes obtenidos correctamente"
            });
        }
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al traer los clientes: ",
            error: error.mensaje
        });
    }
});

app.get("/cliente/:id", async (req, res) => {
    try {
        const cliente = await prisma.cliente.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        if (cliente) {
            res.json({
                data: cliente,
                mensaje: "cliente obtenido correctamente"
            });
        }
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al traer al cliente ",
            error: error.mensaje
        });
    }
});


app.post("/cliente", async (req, res) => {
    try {
        const { nit, nombre, telefono, correo, direccion, puntosFidelizacion } = req.body;

        if (nit >= 1000000 || nit <= 9999999) {
            res.json({
                mensaje: "El nit debe tener mínimo 7 dígitos y máximo 9 dígitos"
            });
            return;
        }

        if (nombre === '' || direccion === '') {
            res.json({
                mensaje: "Este campo es obligatorio"
            })
            return;
        }

        if (telefono < 10000000 || telefono > 99999999) {
            res.json({
                message: "El teléfono es obligatorio y debe ser un número válido con exactamente 8 dígitos."
            });
            return;
        }

        const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correo || !correoValido.test(correo)) {
          res.json({
            message: "El correo es obligatorio y debe tener un formato válido."
          });
          return;
        }

        const clienteExis = await prisma.cliente.findUnique({
            where: {
                nit: nit
            }
        });
        if (clienteExis) {
            res.json({
                mensaje: "El nit ingresado ya fue registrado"
            })
            return;
        }
        const clienteCreado = await prisma.cliente.create({
            data: {
                nit,
                nombre,
                telefono,
                correo,
                direccion,
                puntosFidelizacion
            }
        });
        res.json({
            mensaje: "Cliente creado correctamente",
            data: clienteCreado
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al crear cliente",
            error: error.mensaje

        })
    }
});

app.put('/cliente/:nit', async (req, res) => {
    try {
        const cliente = await prisma.cliente.update({
            where:{
                nit: Number(req.params.nit)
            },
            data: req.body
        });
        if(cliente){
            res.json({
                data:cliente,
                mensaje: "cliente actulaizado correctamente"
            });
        }
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al actualizar al cliente",
            error: error.message
        });
    }
});

app.delete('/cliente/:nit', async (req, res) => {
    try {
        const cliente = await prisma.cliente.update({
            where:{
                nit: Number(req.params.nit)
            },
        });
        if(cliente){
            res.json({
                data:cliente,
                mensaje: "cliente eliminado correctamente"
            });
        }
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar al cliente",
            error: error.mensaje
        });
    }
});

module.exports = app;