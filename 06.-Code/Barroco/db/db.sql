-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-05-2025 a las 03:52:49
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `barroco`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrator`
--

CREATE TABLE `administrator` (
  `idAdmin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administrator`
--

INSERT INTO `administrator` (`idAdmin`) VALUES
(11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart_item`
--

CREATE TABLE `cart_item` (
  `idItemCart` int(11) NOT NULL,
  `idShoppingCart` int(11) DEFAULT NULL,
  `idProduct` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cart_item`
--

INSERT INTO `cart_item` (`idItemCart`, `idShoppingCart`, `idProduct`, `quantity`, `subtotal`) VALUES
(1, 1, 1, 2, 31.00),
(2, 1, 2, 1, 25.50),
(3, 2, 3, 1, 40.00),
(4, 2, 4, 3, 56.25),
(5, 3, 7, 2, 45.00),
(6, 3, 6, 4, 51.96),
(7, 4, 8, 1, 16.75),
(8, 4, 9, 2, 55.00),
(9, 5, 10, 1, 38.00),
(10, 5, 6, 2, 25.98),
(11, 6, 5, 1, 35.00),
(12, 6, 4, 2, 37.50),
(13, 6, 7, 1, 22.50),
(14, 13, 9, 1, 27.00),
(15, 14, 3, 4, 160.00),
(16, 14, 3, 1, 40.00),
(17, 14, 6, 1, 12.99),
(18, 14, 3, 1, 40.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `idCategory` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`idCategory`, `name`, `description`) VALUES
(1, 'Jarros', 'Jarros artesanales de cerámica'),
(2, 'Platos', 'Platos decorativos y funcionales'),
(3, 'Floreros', 'Floreros elegantes para decoración'),
(4, 'Macetas', 'Macetas para plantas de interior'),
(5, 'Jarrones', 'Jarrones de diseño exclusivo'),
(6, 'Cuencos', 'Cuencos y bowls variados'),
(7, 'Bols', 'Bols para uso diario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `customer`
--

CREATE TABLE `customer` (
  `idCustomer` int(11) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `billingAddress` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `customer`
--

INSERT INTO `customer` (`idCustomer`, `phone`, `billingAddress`) VALUES
(5, '+1234567890', 'Calle 123, Ciudad, País'),
(6, '+0987654321', 'Avenida 456, Ciudad, País'),
(7, '+1122334455', 'Boulevard 789, Ciudad, País'),
(8, '+5566778899', 'Camino Real 101, Ciudad, País'),
(9, '+6677889900', 'Plaza Central 202, Ciudad, País'),
(10, '+7788990011', 'Ruta 303, Ciudad, País'),
(11, NULL, NULL),
(12, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `customer_product`
--

CREATE TABLE `customer_product` (
  `idCustomer` int(11) NOT NULL,
  `idProduct` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `employee`
--

CREATE TABLE `employee` (
  `idEmployee` int(11) NOT NULL,
  `role` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `employee`
--

INSERT INTO `employee` (`idEmployee`, `role`) VALUES
(1, 'Administrador'),
(3, 'Empleado'),
(4, 'Empleado'),
(5, 'Cliente'),
(6, 'Cliente'),
(7, 'Cliente'),
(8, 'Cliente'),
(9, 'Cliente'),
(10, 'Cliente'),
(11, 'Administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `invoice`
--

CREATE TABLE `invoice` (
  `idInvoice` int(11) NOT NULL,
  `idPayment` int(11) DEFAULT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  `issueDate` date DEFAULT NULL,
  `tax` decimal(10,2) DEFAULT NULL,
  `totalAmount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order`
--

CREATE TABLE `order` (
  `idOrder` int(11) NOT NULL,
  `idCustomer` int(11) DEFAULT NULL,
  `products` text DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `deliveryAddress` text DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `order`
--

INSERT INTO `order` (`idOrder`, `idCustomer`, `products`, `total`, `date`, `deliveryAddress`, `status`) VALUES
(1, 5, 'Jarro de cerámica azul (2), Plato decorativo floral (1)', 56.50, '2025-05-10', 'Calle 123, Ciudad, País', 'Enviado'),
(2, 6, 'Florero moderno (1), Maceta colgante (3)', 77.25, '2025-05-12', 'Avenida 456, Ciudad, País', 'Procesando'),
(3, 7, 'Bol de madera (2), Cuenco artesanal (4)', 104.96, '2025-05-15', 'Boulevard 789, Ciudad, País', 'Entregado'),
(4, 8, 'Jarro verde esmeralda (1), Plato azul con detalles (2)', 71.75, '2025-05-17', 'Camino Real 101, Ciudad, País', 'Entregado'),
(5, 9, 'Florero transparente (1), Cuenco artesanal (2)', 63.98, '2025-05-18', 'Plaza Central 202, Ciudad, País', 'Enviado'),
(6, 10, 'Jarrón cerámica blanca (1), Maceta colgante (2), Bol madera (1)', 94.00, '2025-05-19', 'Ruta 303, Ciudad, País', 'Procesando'),
(7, 8, 'Jarro verde esmeralda (1), Plato azul con detalles (2)', 71.75, '2025-05-17', 'Camino Real 101, Ciudad, País', 'Entregado'),
(8, 9, 'Florero transparente (1), Cuenco artesanal (2)', 63.98, '2025-05-18', 'Plaza Central 202, Ciudad, País', 'Enviado'),
(9, 10, 'Jarrón cerámica blanca (1), Maceta colgante (2), Bol madera (1)', 94.00, '2025-05-19', 'Ruta 303, Ciudad, País', 'Procesando'),
(10, 8, 'Jarro verde esmeralda (1), Plato azul con detalles (2)', 71.75, '2025-05-17', 'Camino Real 101, Ciudad, País', 'Entregado'),
(11, 9, 'Florero transparente (1), Cuenco artesanal (2)', 63.98, '2025-05-18', 'Plaza Central 202, Ciudad, País', 'Enviado'),
(12, 10, 'Jarrón cerámica blanca (1), Maceta colgante (2), Bol madera (1)', 94.00, '2025-05-19', 'Ruta 303, Ciudad, País', 'Procesando'),
(13, 11, 'Jarrón cerámica blanca (1), Maceta colgante (2), Bol madera (1)', 27.00, '2025-05-24', 'Plaza Central 202, Ciudad, País', 'pendiente'),
(14, 12, 'Jarrón cerámica blanca (1), Maceta colgante (2), Bol madera (1)', 252.99, '2025-05-24', 'Plaza Central 202, Ciudad, País', 'pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `payment`
--

CREATE TABLE `payment` (
  `idPayment` int(11) NOT NULL,
  `idOrder` int(11) DEFAULT NULL,
  `idCustomer` int(11) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `paymentMethod` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE `product` (
  `idProduct` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `category` int(11) DEFAULT NULL,
  `url` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`idProduct`, `name`, `description`, `price`, `stock`, `category`, `url`) VALUES
(1, 'Jarro de cerámica azul', 'Jarro artesanal pintado a mano en tonos azules.', 15.50, 30, 1, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'),
(2, 'Plato decorativo floral', 'Plato con diseño floral para decorar.', 25.00, 20, 2, 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=400&q=80'),
(3, 'Florero moderno', 'Florero con diseño moderno y minimalista.', 40.00, 15, 3, 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=80'),
(4, 'Maceta colgante', 'Maceta colgante para plantas pequeñas.', 18.75, 25, 4, 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80'),
(5, 'Jarrón de cerámica blanca', 'Jarrón blanco con acabado mate.', 35.00, 10, 5, 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=400&q=80'),
(6, 'Cuenco artesanal', 'Cuenco de cerámica para uso diario.', 12.99, 40, 6, 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80'),
(7, 'Bol de madera', 'Bol hecho a mano con madera natural.', 22.50, 18, 7, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80'),
(8, 'Jarro verde esmeralda', 'Jarro con esmalte verde brillante.', 16.75, 22, 1, 'https://images.unsplash.com/photo-1509228627152-f1b7b9d9d345?auto=format&fit=crop&w=400&q=80'),
(9, 'Plato azul con detalles', 'Plato azul con detalles artísticos.', 27.00, 19, 2, 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=400&q=80'),
(10, 'Florero transparente', 'Florero de vidrio transparente elegante.', 38.00, 12, 3, 'https://images.unsplash.com/photo-1498579809087-ef1e558fd1e2?auto=format&fit=crop&w=400&q=80');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `shopping_cart`
--

CREATE TABLE `shopping_cart` (
  `idShoppingCart` int(11) NOT NULL,
  `idOrder` int(11) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `shopping_cart`
--

INSERT INTO `shopping_cart` (`idShoppingCart`, `idOrder`, `total`) VALUES
(1, 1, 56.50),
(2, 2, 77.25),
(3, 3, 104.96),
(4, 4, 71.75),
(5, 5, 63.98),
(6, 6, 94.00),
(13, 13, 27.00),
(14, 14, 252.99);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `idUser` int(11) NOT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`idUser`, `firstName`, `lastName`, `email`, `password`) VALUES
(1, 'Oswaldo', 'Tipan', 'oswaldoj.tipan@gmail.com', '$2y$10$wH2qlT1rVx5vlyA8cZaWGeuRVDVRYkXhD97w7E8V1NUZfcz0.D6Si'),
(2, 'María', 'González', 'maria.gonzalez@example.com', '$2y$10$wH2qlT1rVx5vlyA8cZaWGeuRVDVRYkXhD97w7E8V1NUZfcz0.D6Si'),
(3, 'Juan', 'Pérez', 'juan.perez@example.com', '$2y$10$wH2qlT1rVx5vlyA8cZaWGeuRVDVRYkXhD97w7E8V1NUZfcz0.D6Si'),
(4, 'Ana', 'Ramírez', 'ana.ramirez@example.com', '$2y$10$wH2qlT1rVx5vlyA8cZaWGeuRVDVRYkXhD97w7E8V1NUZfcz0.D6Si'),
(5, 'Luis', 'Martínez', 'luis.martinez@example.com', '$2y$10$wH2qlT1rVx5vlyA8cZaWGeuRVDVRYkXhD97w7E8V1NUZfcz0.D6Si'),
(6, 'Sofía', 'García', 'sofia.garcia@example.com', '$2y$10$wH2qlT1rVx5vlyA8cZaWGeuRVDVRYkXhD97w7E8V1NUZfcz0.D6Si'),
(7, 'Carlos', 'Lopez', 'carlos.lopez@example.com', '$2y$10$wH2qlT1rVx5vlyA8cZaWGeuRVDVRYkXhD97w7E8V1NUZfcz0.D6Si'),
(8, 'Laura', 'Fernández', 'laura.fernandez@example.com', '$2y$10$wH2qlT1rVx5vlyA8cZaWGeuRVDVRYkXhD97w7E8V1NUZfcz0.D6Si'),
(9, 'Diego', 'Sánchez', 'diego.sanchez@example.com', '$2y$10$wH2qlT1rVx5vlyA8cZaWGeuRVDVRYkXhD97w7E8V1NUZfcz0.D6Si'),
(10, 'Valeria', 'Torres', 'valeria.torres@example.com', '$2y$10$wH2qlT1rVx5vlyA8cZaWGeuRVDVRYkXhD97w7E8V1NUZfcz0.D6Si'),
(11, 'Oswaldo', '', 'ojtipan@gmail.com', '$2y$10$J8w5CoUyw5QHudIM6dmkPe/nis1FhSfwwWYW8WfnfGPnK/raIwTM6'),
(12, 'jose', '', 'hola@gmail.com', '$2y$10$xvQkZMClF7QRPk7GxhNQBuHSs2u/40VIyRwOoUC9DGAWUdTHpAZNq');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrator`
--
ALTER TABLE `administrator`
  ADD PRIMARY KEY (`idAdmin`);

--
-- Indices de la tabla `cart_item`
--
ALTER TABLE `cart_item`
  ADD PRIMARY KEY (`idItemCart`),
  ADD KEY `idShoppingCart` (`idShoppingCart`),
  ADD KEY `idProduct` (`idProduct`);

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`idCategory`);

--
-- Indices de la tabla `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`idCustomer`);

--
-- Indices de la tabla `customer_product`
--
ALTER TABLE `customer_product`
  ADD PRIMARY KEY (`idCustomer`,`idProduct`),
  ADD KEY `idProduct` (`idProduct`);

--
-- Indices de la tabla `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`idEmployee`);

--
-- Indices de la tabla `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`idInvoice`),
  ADD KEY `idPayment` (`idPayment`);

--
-- Indices de la tabla `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`idOrder`),
  ADD KEY `idCustomer` (`idCustomer`);

--
-- Indices de la tabla `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`idPayment`),
  ADD UNIQUE KEY `idOrder` (`idOrder`),
  ADD KEY `idCustomer` (`idCustomer`);

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`idProduct`),
  ADD KEY `category` (`category`);

--
-- Indices de la tabla `shopping_cart`
--
ALTER TABLE `shopping_cart`
  ADD PRIMARY KEY (`idShoppingCart`),
  ADD UNIQUE KEY `idOrder` (`idOrder`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cart_item`
--
ALTER TABLE `cart_item`
  MODIFY `idItemCart` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `idCategory` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `invoice`
--
ALTER TABLE `invoice`
  MODIFY `idInvoice` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `order`
--
ALTER TABLE `order`
  MODIFY `idOrder` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `payment`
--
ALTER TABLE `payment`
  MODIFY `idPayment` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
  MODIFY `idProduct` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `shopping_cart`
--
ALTER TABLE `shopping_cart`
  MODIFY `idShoppingCart` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administrator`
--
ALTER TABLE `administrator`
  ADD CONSTRAINT `administrator_ibfk_1` FOREIGN KEY (`idAdmin`) REFERENCES `employee` (`idEmployee`);

--
-- Filtros para la tabla `cart_item`
--
ALTER TABLE `cart_item`
  ADD CONSTRAINT `cart_item_ibfk_1` FOREIGN KEY (`idShoppingCart`) REFERENCES `shopping_cart` (`idShoppingCart`),
  ADD CONSTRAINT `cart_item_ibfk_2` FOREIGN KEY (`idProduct`) REFERENCES `product` (`idProduct`);

--
-- Filtros para la tabla `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`idCustomer`) REFERENCES `user` (`idUser`);

--
-- Filtros para la tabla `customer_product`
--
ALTER TABLE `customer_product`
  ADD CONSTRAINT `customer_product_ibfk_1` FOREIGN KEY (`idCustomer`) REFERENCES `customer` (`idCustomer`),
  ADD CONSTRAINT `customer_product_ibfk_2` FOREIGN KEY (`idProduct`) REFERENCES `product` (`idProduct`);

--
-- Filtros para la tabla `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`idEmployee`) REFERENCES `user` (`idUser`);

--
-- Filtros para la tabla `invoice`
--
ALTER TABLE `invoice`
  ADD CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`idPayment`) REFERENCES `payment` (`idPayment`);

--
-- Filtros para la tabla `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`idCustomer`) REFERENCES `customer` (`idCustomer`);

--
-- Filtros para la tabla `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`idCustomer`) REFERENCES `customer` (`idCustomer`),
  ADD CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`idOrder`) REFERENCES `order` (`idOrder`);

--
-- Filtros para la tabla `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category`) REFERENCES `category` (`idCategory`);

--
-- Filtros para la tabla `shopping_cart`
--
ALTER TABLE `shopping_cart`
  ADD CONSTRAINT `shopping_cart_ibfk_1` FOREIGN KEY (`idOrder`) REFERENCES `order` (`idOrder`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
