-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cliente" (
    "nit" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "puntosFidelizacion" INTEGER,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("nit")
);

-- CreateTable
CREATE TABLE "categoria" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proveedor" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "contacto" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,

    CONSTRAINT "proveedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingrediente" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "stockActual" INTEGER NOT NULL,
    "unidadMedida" TEXT NOT NULL,
    "precioUnitario" DECIMAL(65,30) NOT NULL,
    "estado" BOOLEAN NOT NULL,

    CONSTRAINT "ingrediente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insumo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "stockActual" INTEGER NOT NULL,
    "unidadMedida" TEXT NOT NULL,
    "precioUnitario" DECIMAL(65,30) NOT NULL,
    "estado" BOOLEAN NOT NULL,

    CONSTRAINT "insumo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sucursal" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "dereccion" TEXT NOT NULL,

    CONSTRAINT "sucursal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "venta" (
    "id" SERIAL NOT NULL,
    "fechaVenta" TIMESTAMP(3) NOT NULL,
    "totalVenta" INTEGER NOT NULL,
    "metodoPago" TEXT NOT NULL,
    "descuento" INTEGER,
    "tipoVenta" TEXT NOT NULL,
    "idCliente" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "venta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "precioVenta" INTEGER NOT NULL,
    "stockActual" INTEGER NOT NULL,
    "StockMinimo" INTEGER NOT NULL,
    "unidadMedida" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL,
    "idCategoria" INTEGER NOT NULL,

    CONSTRAINT "producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredienteProducto" (
    "id" SERIAL NOT NULL,
    "cantidadIngrediente" INTEGER NOT NULL,
    "idIngrediente" INTEGER NOT NULL,
    "idProducto" INTEGER NOT NULL,

    CONSTRAINT "ingredienteProducto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalleVenta" (
    "id" SERIAL NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precioUnitario" INTEGER NOT NULL,
    "subTotal" INTEGER NOT NULL,
    "idVenta" INTEGER NOT NULL,
    "idProducto" INTEGER NOT NULL,

    CONSTRAINT "detalleVenta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compra" (
    "id" SERIAL NOT NULL,
    "fechaCompra" TIMESTAMP(3) NOT NULL,
    "totalCompra" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "idProveedor" INTEGER NOT NULL,

    CONSTRAINT "compra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalleCompra" (
    "id" SERIAL NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precioUnitario" INTEGER NOT NULL,
    "subTotal" INTEGER NOT NULL,
    "idCompra" INTEGER NOT NULL,
    "idIngrediente" INTEGER NOT NULL,
    "idInsumo" INTEGER NOT NULL,

    CONSTRAINT "detalleCompra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insumoSucursal" (
    "id" SERIAL NOT NULL,
    "stockActual" INTEGER NOT NULL,
    "idSucursal" INTEGER NOT NULL,
    "idInsumo" INTEGER NOT NULL,

    CONSTRAINT "insumoSucursal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_correo_key" ON "usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "cliente_nit_key" ON "cliente"("nit");

-- AddForeignKey
ALTER TABLE "venta" ADD CONSTRAINT "venta_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "cliente"("nit") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venta" ADD CONSTRAINT "venta_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto" ADD CONSTRAINT "producto_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredienteProducto" ADD CONSTRAINT "ingredienteProducto_idIngrediente_fkey" FOREIGN KEY ("idIngrediente") REFERENCES "ingrediente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredienteProducto" ADD CONSTRAINT "ingredienteProducto_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalleVenta" ADD CONSTRAINT "detalleVenta_idVenta_fkey" FOREIGN KEY ("idVenta") REFERENCES "venta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalleVenta" ADD CONSTRAINT "detalleVenta_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compra" ADD CONSTRAINT "compra_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compra" ADD CONSTRAINT "compra_idProveedor_fkey" FOREIGN KEY ("idProveedor") REFERENCES "proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalleCompra" ADD CONSTRAINT "detalleCompra_idCompra_fkey" FOREIGN KEY ("idCompra") REFERENCES "compra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalleCompra" ADD CONSTRAINT "detalleCompra_idIngrediente_fkey" FOREIGN KEY ("idIngrediente") REFERENCES "ingrediente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalleCompra" ADD CONSTRAINT "detalleCompra_idInsumo_fkey" FOREIGN KEY ("idInsumo") REFERENCES "insumo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insumoSucursal" ADD CONSTRAINT "insumoSucursal_idSucursal_fkey" FOREIGN KEY ("idSucursal") REFERENCES "sucursal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insumoSucursal" ADD CONSTRAINT "insumoSucursal_idInsumo_fkey" FOREIGN KEY ("idInsumo") REFERENCES "insumo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
