const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const usuario = require("./controllers/usuario");
const cliente = require("./controllers/cliente");
const proveedor = require("./controllers/proveedor");
const insumo = require("./controllers/insumo");
const ingrediente = require("./controllers/ingrediente");
const sucursal = require("./controllers/sucursal");
const venta = require("./controllers/venta");
const producto = require("./controllers/producto");
const ingredienteProdu = require("./controllers/ingredienteProdu");
const detalleVenta = require("./controllers/detalleVenta");
const compra = require("./controllers/compra");
const detalleCompra = require("./controllers/detalleCompra");

const app = express();
const port = 3000;

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());
app.use(cors());
app.use(usuario);
app.use(cliente);
app.use(proveedor);
app.use(ingrediente);
app.use(insumo);
app.use(sucursal);
app.use(venta);
app.use(producto);
app.use(ingredienteProdu);
app.use(detalleVenta);
app.use(compra);
app.use(detalleCompra);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
