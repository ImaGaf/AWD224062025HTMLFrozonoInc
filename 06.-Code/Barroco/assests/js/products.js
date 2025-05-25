document.addEventListener("DOMContentLoaded", loadProducts);

function loadProducts() {
  fetch("../server/getProducts.php")
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById("productTable");
      table.innerHTML = `
        <tr><th>ID</th><th>Nombre</th><th>Descripción</th><th>Precio</th><th>Acciones</th></tr>
      ` + data.map(p => `
        <tr>
          <td>${p.id}</td>
          <td>${p.name}</td>
          <td>${p.description}</td>
          <td>${p.price}</td>
          <td>
            <button onclick='edit(${JSON.stringify(p)})'>Editar</button>
            <button onclick='remove(${p.id})'>Eliminar</button>
          </td>
        </tr>
      `).join('');
    });
}

function showForm() {
  document.getElementById("formContainer").style.display = "block";
}

function saveProduct() {
  const id = document.getElementById("productId").value;
  const name = document.getElementById("productName").value;
  const description = document.getElementById("productDesc").value;
  const price = document.getElementById("productPrice").value;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);
  if (id) formData.append("id", id);

  const url = id ? "../server/editProduct.php" : "../server/addProduct.php";

  fetch(url, {
    method: "POST",
    body: formData
  }).then(() => {
    document.getElementById("formContainer").style.display = "none";
    document.getElementById("productId").value = "";
    loadProducts();
  });
}

function edit(product) {
  showForm();
  document.getElementById("productId").value = product.id;
  document.getElementById("productName").value = product.name;
  document.getElementById("productDesc").value = product.description;
  document.getElementById("productPrice").value = product.price;
}

function remove(id) {
  const formData = new FormData();
  formData.append("id", id);
  fetch("../server/deleteProduct.php", {
    method: "POST",
    body: formData
  }).then(() => loadProducts());
}
