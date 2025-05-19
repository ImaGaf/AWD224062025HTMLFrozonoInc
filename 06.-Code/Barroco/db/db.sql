SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `barroco`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE `barroco`;

CREATE TABLE IF NOT EXISTS `user` (
  `idUser` INT(11) NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(50),
  `lastName` VARCHAR(50),
  `email` VARCHAR(100),
  `password` VARCHAR(255),
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `employee` (
  `idEmployee` INT(11) NOT NULL,
  `role` VARCHAR(50),
  PRIMARY KEY (`idEmployee`),
  FOREIGN KEY (`idEmployee`) REFERENCES `user` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `administrator` (
  `idAdmin` INT(11) NOT NULL,
  PRIMARY KEY (`idAdmin`),
  FOREIGN KEY (`idAdmin`) REFERENCES `employee` (`idEmployee`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `customer` (
  `idCustomer` INT(11) NOT NULL,
  `phone` VARCHAR(20),
  `billingAddress` TEXT,
  PRIMARY KEY (`idCustomer`),
  FOREIGN KEY (`idCustomer`) REFERENCES `user` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `order` (
  `idOrder` INT(11) NOT NULL AUTO_INCREMENT,
  `idCustomer` INT(11),
  `products` TEXT,
  `total` DECIMAL(10,2),
  `date` DATE,
  `deliveryAddress` TEXT,
  `status` VARCHAR(50),
  PRIMARY KEY (`idOrder`),
  INDEX (`idCustomer`),
  FOREIGN KEY (`idCustomer`) REFERENCES `customer` (`idCustomer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `shopping_cart` (
  `idShoppingCart` INT(11) NOT NULL AUTO_INCREMENT,
  `idOrder` INT(11),
  `total` DECIMAL(10,2),
  PRIMARY KEY (`idShoppingCart`),
  UNIQUE INDEX (`idOrder`),
  FOREIGN KEY (`idOrder`) REFERENCES `order` (`idOrder`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `category` (
  `idCategory` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100),
  `description` TEXT,
  PRIMARY KEY (`idCategory`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `product` (
  `idProduct` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100),
  `description` TEXT,
  `price` DECIMAL(10,2),
  `stock` INT(11),
  `category` INT(11),
  `url` VARCHAR(200),
  PRIMARY KEY (`idProduct`),
  INDEX (`category`),
  FOREIGN KEY (`category`) REFERENCES `category` (`idCategory`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `cart_item` (
  `idItemCart` INT(11) NOT NULL AUTO_INCREMENT,
  `idShoppingCart` INT(11),
  `idProduct` INT(11),
  `quantity` INT(11),
  `subtotal` DECIMAL(10,2),
  PRIMARY KEY (`idItemCart`),
  INDEX (`idShoppingCart`),
  INDEX (`idProduct`),
  FOREIGN KEY (`idShoppingCart`) REFERENCES `shopping_cart` (`idShoppingCart`),
  FOREIGN KEY (`idProduct`) REFERENCES `product` (`idProduct`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `customer_product` (
  `idCustomer` INT(11) NOT NULL,
  `idProduct` INT(11) NOT NULL,
  PRIMARY KEY (`idCustomer`, `idProduct`),
  INDEX (`idProduct`),
  FOREIGN KEY (`idCustomer`) REFERENCES `customer` (`idCustomer`),
  FOREIGN KEY (`idProduct`) REFERENCES `product` (`idProduct`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `payment` (
  `idPayment` INT(11) NOT NULL AUTO_INCREMENT,
  `idOrder` INT(11),
  `idCustomer` INT(11),
  `amount` DECIMAL(10,2),
  `paymentMethod` VARCHAR(50),
  `status` VARCHAR(50),
  PRIMARY KEY (`idPayment`),
  UNIQUE INDEX (`idOrder`),
  INDEX (`idCustomer`),
  FOREIGN KEY (`idCustomer`) REFERENCES `customer` (`idCustomer`),
  FOREIGN KEY (`idOrder`) REFERENCES `order` (`idOrder`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `invoice` (
  `idInvoice` INT(11) NOT NULL AUTO_INCREMENT,
  `idPayment` INT(11),
  `discount` DECIMAL(10,2),
  `issueDate` DATE,
  `tax` DECIMAL(10,2),
  `totalAmount` DECIMAL(10,2),
  PRIMARY KEY (`idInvoice`),
  UNIQUE INDEX (`idPayment`),
  FOREIGN KEY (`idPayment`) REFERENCES `payment` (`idPayment`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `user` (`firstName`, `lastName`, `email`, `password`) VALUES
('María', 'López', 'maria.lopez@example.com', SHA2('maria123', 256)),
('Carlos', 'Ramírez', 'carlos.ramirez@example.com', SHA2('carlos123', 256)),
('Lucía', 'Gómez', 'lucia.gomez@example.com', SHA2('admin123', 256));

INSERT INTO `customer` (`idCustomer`, `phone`, `billingAddress`) VALUES
(1, '555-123456', 'Calle 123, Ciudad, País'),
(2, '555-654321', 'Av. Siempre Viva 742, Ciudad, País');

INSERT INTO `employee` (`idEmployee`, `role`) VALUES (3, 'Administrador');
INSERT INTO `administrator` (`idAdmin`) VALUES (3);

INSERT INTO `category` (`name`, `description`) VALUES
('Jarros', 'Jarros artesanales de cerámica'),
('Platos', 'Platos decorativos y funcionales'),
('Floreros', 'Floreros de varios estilos'),
('Macetas', 'Macetas pequeñas y grandes'),
('Jarrones', 'Jarrones ornamentales'),
('Cuencos', 'Cuencos para servir o decorar'),
('Bowls', 'Bowls hondos y planos');

INSERT INTO `product` (`name`, `description`, `price`, `stock`, `category`, `url`) VALUES
('Jarro Colonial', 'Jarro estilo colonial pintado a mano.', 18.50, 10, 1, 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Chinese_vase.jpg'),
('Plato Decorativo Azul', 'Plato con patrón azul tradicional.', 25.00, 8, 2, 'https://www.catemma.com.mx/cdn/shop/products/catemma-cocina-comedor-no-plato-trinche-centela-71-24896472264.jpg?v=1577327908'),
('Florero Alto Marrón', 'Florero alto para interiores rústicos.', 32.99, 5, 3, 'https://web-pro-resources.s3.us-east-2.amazonaws.com/public/optimized-resources/product/ddff2e4b-4dfc-49f4-b2db-c1ec6a23baa0/image/florero-decorativo-34cm-asimetrico-madera_2-600x600.jpg'),
('Maceta Vintage', 'Maceta decorativa de estilo vintage.', 15.75, 12, 4, 'https://www.purplant.es/wp-content/uploads/2025/02/Wave-Mini-Maceta-Ceramica-green2.jpg'),
('Jarrón Negro Clásico', 'Jarrón elegante de cerámica negra.', 45.90, 7, 5, 'https://kovenspirits.com/cdn/shop/products/DSC_6281.jpg?v=1677000748'),
('Cuenco Minimalista', 'Cuenco blanco minimalista para servir.', 13.20, 20, 6, 'https://crisandecor.com/wp-content/uploads/2019/01/bowl-porcelana-blanca-Copy.jpg'),
('Bowl Pintado a Mano', 'Bowl con colores vivos pintado a mano.', 21.50, 9, 7, 'https://i.pinimg.com/736x/2d/e0/00/2de000c2ac62eebc907d980067436082.jpg');

INSERT INTO `order` (`idCustomer`, `products`, `total`, `date`, `deliveryAddress`, `status`) VALUES
(1, '1,2', 43.50, CURDATE(), 'Calle 123, Ciudad, País', 'Pendiente');

INSERT INTO `shopping_cart` (`idOrder`, `total`) VALUES
(1, 43.50);

INSERT INTO `cart_item` (`idShoppingCart`, `idProduct`, `quantity`, `subtotal`) VALUES
(1, 1, 1, 18.50),
(1, 2, 1, 25.00);

INSERT INTO `payment` (`idOrder`, `idCustomer`, `amount`, `paymentMethod`, `status`) VALUES
(1, 1, 43.50, 'Tarjeta', 'Pagado');

INSERT INTO `invoice` (`idPayment`, `discount`, `issueDate`, `tax`, `totalAmount`) VALUES
(1, 0.00, CURDATE(), 6.53, 50.03);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
