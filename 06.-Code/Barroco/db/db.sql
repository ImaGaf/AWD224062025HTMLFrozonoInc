CREATE DATABASE IF NOT EXISTS barroco CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE barroco;

CREATE TABLE IF NOT EXISTS `user` (
  `idUser` INT(11) NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(50),
  `lastName` VARCHAR(50),
  `email` VARCHAR(100),
  `password` VARCHAR(255),
  PRIMARY KEY (`idUser`),
  UNIQUE (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `employee` (
  `idEmployee` INT(11) NOT NULL,
  `role` VARCHAR(50),
  PRIMARY KEY (`idEmployee`),
  FOREIGN KEY (`idEmployee`) REFERENCES `user` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `administrator` (
  `idAdmin` INT(11) NOT NULL,
  PRIMARY KEY (`idAdmin`),
  FOREIGN KEY (`idAdmin`) REFERENCES `employee` (`idEmployee`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `customer` (
  `idCustomer` INT(11) NOT NULL,
  `phone` VARCHAR(20),
  `billingAddress` TEXT,
  PRIMARY KEY (`idCustomer`),
  FOREIGN KEY (`idCustomer`) REFERENCES `user` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `order` (
  `idOrder` INT(11) NOT NULL AUTO_INCREMENT,
  `idCustomer` INT(11),
  `products` TEXT,
  `total` DECIMAL(10,2),
  `date` DATE,
  `deliveryAddress` TEXT,
  `status` VARCHAR(50),
  PRIMARY KEY (`idOrder`),
  FOREIGN KEY (`idCustomer`) REFERENCES `customer` (`idCustomer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `shopping_cart` (
  `idShoppingCart` INT(11) NOT NULL AUTO_INCREMENT,
  `idOrder` INT(11),
  `total` DECIMAL(10,2),
  PRIMARY KEY (`idShoppingCart`),
  UNIQUE (`idOrder`),
  FOREIGN KEY (`idOrder`) REFERENCES `order` (`idOrder`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `category` (
  `idCategory` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100),
  `description` TEXT,
  PRIMARY KEY (`idCategory`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `product` (
  `idProduct` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100),
  `description` TEXT,
  `price` DECIMAL(10,2),
  `stock` INT(11),
  `category` INT(11),
  `url` VARCHAR(200),
  PRIMARY KEY (`idProduct`),
  FOREIGN KEY (`category`) REFERENCES `category` (`idCategory`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `cart_item` (
  `idItemCart` INT(11) NOT NULL AUTO_INCREMENT,
  `idShoppingCart` INT(11),
  `idProduct` INT(11),
  `quantity` INT(11),
  `subtotal` DECIMAL(10,2),
  PRIMARY KEY (`idItemCart`),
  FOREIGN KEY (`idShoppingCart`) REFERENCES `shopping_cart` (`idShoppingCart`),
  FOREIGN KEY (`idProduct`) REFERENCES `product` (`idProduct`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `customer_product` (
  `idCustomer` INT(11) NOT NULL,
  `idProduct` INT(11) NOT NULL,
  PRIMARY KEY (`idCustomer`, `idProduct`),
  FOREIGN KEY (`idCustomer`) REFERENCES `customer` (`idCustomer`),
  FOREIGN KEY (`idProduct`) REFERENCES `product` (`idProduct`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `payment` (
  `idPayment` INT(11) NOT NULL AUTO_INCREMENT,
  `idOrder` INT(11),
  `idCustomer` INT(11),
  `amount` DECIMAL(10,2),
  `paymentMethod` VARCHAR(50),
  `status` VARCHAR(50),
  PRIMARY KEY (`idPayment`),
  UNIQUE (`idOrder`),
  FOREIGN KEY (`idCustomer`) REFERENCES `customer` (`idCustomer`),
  FOREIGN KEY (`idOrder`) REFERENCES `order` (`idOrder`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `invoice` (
  `idInvoice` INT(11) NOT NULL AUTO_INCREMENT,
  `idPayment` INT(11),
  `discount` DECIMAL(10,2),
  `issueDate` DATE,
  `tax` DECIMAL(10,2),
  `totalAmount` DECIMAL(10,2),
  PRIMARY KEY (`idInvoice`),
  FOREIGN KEY (`idPayment`) REFERENCES `payment` (`idPayment`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


USE barroco;

INSERT INTO `user` (firstName, lastName, email, password) VALUES
('Oswaldo', 'Tipan', 'oswaldoj.tipan@gmail.com', '$2y$10$wH2qlT1rVx5vlyA8cZaWGeuRVDVRYkXhD97w7E8V1NUZfcz0.D6Si'),
('María', 'González', 'maria.gonzalez@example.com', '$2y$10$wH2qlT1rVx5vlyA8cZaWGeuRVDVRYkXhD97w7E8V1NUZfcz0.D6Si'),
('Juan', 'Pérez', 'juan.perez@example.com', '$2y$10$wH2qlT1rVx5vlyA8cZaWGeuRVDVRYkXhD97w7E8V1NUZfcz0.D6Si'),
('Ana', 'Ramírez', 'ana.ramirez@example.com', '$2y$10$wH2qlT1rVx5vlyA8cZaWGeuRVDVRYkXhD97w7E8V1NUZfcz0.D6Si'),
('Luis', 'Martínez', 'luis.martinez@example.com', '$2y$10$wH2qlT1rVx5vlyA8cZaWGeuRVDVRYkXhD97w7E8V1NUZfcz0.D6Si'),
('Sofía', 'García', 'sofia.garcia@example.com', '$2y$10$wH2qlT1rVx5vlyA8cZaWGeuRVDVRYkXhD97w7E8V1NUZfcz0.D6Si'),
('Carlos', 'Lopez', 'carlos.lopez@example.com', '$2y$10$wH2qlT1rVx5vlyA8cZaWGeuRVDVRYkXhD97w7E8V1NUZfcz0.D6Si'),
('Laura', 'Fernández', 'laura.fernandez@example.com', '$2y$10$wH2qlT1rVx5vlyA8cZaWGeuRVDVRYkXhD97w7E8V1NUZfcz0.D6Si'),
('Diego', 'Sánchez', 'diego.sanchez@example.com', '$2y$10$wH2qlT1rVx5vlyA8cZaWGeuRVDVRYkXhD97w7E8V1NUZfcz0.D6Si'),
('Valeria', 'Torres', 'valeria.torres@example.com', '$2y$10$wH2qlT1rVx5vlyA8cZaWGeuRVDVRYkXhD97w7E8V1NUZfcz0.D6Si');

INSERT INTO `employee` (idEmployee, role) VALUES
(1, 'Administrador'),
(2, 'Empleado'),
(3, 'Empleado'),
(4, 'Empleado'),
(5, 'Cliente'),
(6, 'Cliente'),
(7, 'Cliente'),
(8, 'Cliente'),
(9, 'Cliente'),
(10, 'Cliente');

INSERT INTO `administrator` (idAdmin) VALUES (1);

INSERT INTO `customer` (idCustomer, phone, billingAddress) VALUES
(5, '+1234567890', 'Calle 123, Ciudad, País'),
(6, '+0987654321', 'Avenida 456, Ciudad, País'),
(7, '+1122334455', 'Boulevard 789, Ciudad, País'),
(8, '+5566778899', 'Camino Real 101, Ciudad, País'),
(9, '+6677889900', 'Plaza Central 202, Ciudad, País'),
(10, '+7788990011', 'Ruta 303, Ciudad, País');

INSERT INTO `category` (name, description) VALUES
('Jarros', 'Jarros artesanales de cerámica'),
('Platos', 'Platos decorativos y funcionales'),
('Floreros', 'Floreros elegantes para decoración'),
('Macetas', 'Macetas para plantas de interior'),
('Jarrones', 'Jarrones de diseño exclusivo'),
('Cuencos', 'Cuencos y bowls variados'),
('Bols', 'Bols para uso diario');

INSERT INTO `product` (name, description, price, stock, category, url) VALUES
('Jarro de cerámica azul', 'Jarro artesanal pintado a mano en tonos azules.', 15.50, 30, 1, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'),
('Plato decorativo floral', 'Plato con diseño floral para decorar.', 25.00, 20, 2, 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=400&q=80'),
('Florero moderno', 'Florero con diseño moderno y minimalista.', 40.00, 15, 3, 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=80'),
('Maceta colgante', 'Maceta colgante para plantas pequeñas.', 18.75, 25, 4, 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80'),
('Jarrón de cerámica blanca', 'Jarrón blanco con acabado mate.', 35.00, 10, 5, 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=400&q=80'),
('Cuenco artesanal', 'Cuenco de cerámica para uso diario.', 12.99, 40, 6, 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80'),
('Bol de madera', 'Bol hecho a mano con madera natural.', 22.50, 18, 7, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80'),
('Jarro verde esmeralda', 'Jarro con esmalte verde brillante.', 16.75, 22, 1, 'https://images.unsplash.com/photo-1509228627152-f1b7b9d9d345?auto=format&fit=crop&w=400&q=80'),
('Plato azul con detalles', 'Plato azul con detalles artísticos.', 27.00, 19, 2, 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=400&q=80'),
('Florero transparente', 'Florero de vidrio transparente elegante.', 38.00, 12, 3, 'https://images.unsplash.com/photo-1498579809087-ef1e558fd1e2?auto=format&fit=crop&w=400&q=80');

INSERT INTO `order` (idCustomer, products, total, date, deliveryAddress, status) VALUES
(5, 'Jarro de cerámica azul (2), Plato decorativo floral (1)', 56.50, '2025-05-10', 'Calle 123, Ciudad, País', 'Enviado'),
(6, 'Florero moderno (1), Maceta colgante (3)', 77.25, '2025-05-12', 'Avenida 456, Ciudad, País', 'Procesando'),
(7, 'Bol de madera (2), Cuenco artesanal (4)', 104.96, '2025-05-15', 'Boulevard 789, Ciudad, País', 'Entregado');

INSERT INTO `shopping_cart` (idOrder, total) VALUES
(1, 56.50),
(2, 77.25),
(3, 104.96);

INSERT INTO `cart_item` (idShoppingCart, idProduct, quantity, subtotal) VALUES
(1, 1, 2, 31.00),   
(1, 2, 1, 25.50), 

(2, 3, 1, 40.00),  
(2, 4, 3, 56.25),  

(3, 7, 2, 45.00),   
(3, 6, 4, 51.96);   

-- 10. Insertar pagos
INSERT INTO `payment` (idOrder, amount, paymentDate, method) VALUES
(1, 56.50, '2025-05-11', 'Tarjeta de crédito'),
(2, 77.25, '2025-05-13', 'PayPal'),
(3, 104.96, '2025-05-16', 'Transferencia bancaria');

INSERT INTO `invoice` (idOrder, invoiceDate, total, billingAddress) VALUES
(1, '2025-05-11', 56.50, 'Calle 123, Ciudad, País'),
(2, '2025-05-13', 77.25, 'Avenida 456, Ciudad, País'),
(3, '2025-05-16', 104.96, 'Boulevard 789, Ciudad, País');
