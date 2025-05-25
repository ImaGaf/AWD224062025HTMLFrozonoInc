<?php include('../components/headerAdmin.php'); ?>

<h2>Gestión de Productos</h2>
<button onclick="showForm()">Agregar Producto</button>

<div id="formContainer" style="display:none;">
  <input type="hidden" id="productId">
  <input type="text" id="productName" placeholder="Nombre">
  <textarea id="productDesc" placeholder="Descripción"></textarea>
  <input type="number" id="productPrice" placeholder="Precio">
  <button onclick="saveProduct()">Guardar</button>
</div>

<table id="productTable"></table>

<script src="../assets/js/products.js"></script>
