// Utilidades para sincronizar el carrito con el backend
import { cartAPI, getCurrentUser } from "./api";
import { cartStore } from "./cart-store";

// Intentamos mantener 1 carrito por usuario.
// Guardamos en sessionStorage el identificador devuelto por el backend
// para poder actualizarlo posteriormente.
const SHOPPING_CART_ID_KEY = "shoppingCartId";

function getCustomerIdentifier(user: any | null): string | null {
  if (!user) return null;
  // Preferimos idCustomer numérico si existe, si no, el _id de Mongo
  const id = user?.idCustomer ?? user?._id ?? user?.id ?? null;
  return id ? String(id) : null;
}

function buildPayload() {
  const items = cartStore.getItems();
  const total = cartStore.getTotal();
  const user = getCurrentUser();
  const customer = getCustomerIdentifier(user);

  return {
    // idShoppingCar opcional: el backend puede generarlo
    customer, // Ej: "CUST001" o idCustomer/_id del usuario
    product: items.map((i) => ({
      idProduct: i.productId,
      quantity: i.quantity,
      price: i.price,
    })),
    total: Number(total.toFixed(2)),
  } as any;
}

interface ShoppingCartResponse {
  idShoppingCar?: string | number;
  _id?: string | number;
  id?: string | number;
}

function extractCartId(data: ShoppingCartResponse | null | undefined): string | null {
  const id = data?.idShoppingCar ?? data?._id ?? data?.id;
  return id ? String(id) : null;
}

export async function upsertCartForCurrentUser(): Promise<string | null> {
  const user = getCurrentUser();
  const customer = getCustomerIdentifier(user);
  console.log("Usuario:", user, "Customer:", customer);
  if (!customer) return null;

  const payload = buildPayload();
  console.log("Payload enviado:", payload);

  const existingId = sessionStorage.getItem(SHOPPING_CART_ID_KEY);
  console.log("Carrito existente:", existingId);

  try {
    if (existingId) {
      const updated: any = await cartAPI.update(existingId, payload);
      console.log("Respuesta update:", updated);
      const id = updated?.idShoppingCar || updated?._id || existingId;
      sessionStorage.setItem(SHOPPING_CART_ID_KEY, String(id));
      return String(id);
    } else {
      const created: any = await cartAPI.create(payload);
      console.log("Respuesta create:", created);
      const id = created?.idShoppingCar || created?._id || created?.id;
      if (id) sessionStorage.setItem(SHOPPING_CART_ID_KEY, String(id));
      return id ? String(id) : null;
    }
  } catch (e) {
    console.error("Error al guardar carrito:", e);
    return existingId ?? null;
  }
}

export async function loadCartForCurrentUser(): Promise<void> {
  // Si tenemos un ID almacenado, lo intentamos cargar y reflejar localmente
  const cartId = sessionStorage.getItem(SHOPPING_CART_ID_KEY);
  if (!cartId) return;

  try {
    const data: any = await cartAPI.getById(cartId);
    const products: Array<{ idProduct: string; quantity: number; price: number }> =
      Array.isArray(data?.product) ? data.product : [];

    // Limpiamos y cargamos
    cartStore.clear();
    products.forEach((p) => {
      // Generamos un id interno estable por producto para el store local
      const localId = `${p.idProduct}`;
      cartStore.addItem({
        id: localId,
        productId: p.idProduct,
        name: p.idProduct, // Si no tenemos nombre, usamos id; UI puede mostrar ícono genérico
        price: Number(p.price) || 0,
        quantity: Number(p.quantity) || 1,
      } as any);
    });
  } catch (e) {
    // Si falla la carga, ignoramos
  }
}
