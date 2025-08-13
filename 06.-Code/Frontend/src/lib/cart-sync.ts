import { cartAPI, getCurrentUser } from "./api";
import { cartStore } from "./cart-store";

const SHOPPING_CART_ID_KEY = "shoppingCartId";

function getCustomerIdentifier(user: any | null): string | null {
  if (!user) return null;
  const id = user?.idCustomer ?? user?._id ?? user?.id ?? null;
  return id ? String(id) : null;
}

function buildPayload() {
  const items = cartStore.getItems();
  const total = cartStore.getTotal();
  const user = getCurrentUser();
  const customer = getCustomerIdentifier(user);

  return {
    customer, 
    products: items.map((i) => ({
      idProduct: i.productId,
      quantity: i.quantity,
      price: i.price,
    })),
    total: Number(total.toFixed(2)),
  };
}

interface ShoppingCartResponse {
  idShoppingCart?: string | number;
  _id?: string | number;
  id?: string | number;
}

function extractCartId(data: ShoppingCartResponse | null | undefined): string | null {
  const id = data?.idShoppingCart ?? data?._id ?? data?.id;
  return id ? String(id) : null;
}

async function findCartByCustomerId(customerId: string): Promise<string | null> {
  try {
    console.log("Buscando carrito para customer:", customerId);
    
    try {
      const cart = await cartAPI.getByCustomer?.(customerId);
      if (cart) {
        const cartId = extractCartId(cart);
        if (cartId) {
          console.log("Carrito encontrado via getByCustomer:", cartId);
          return cartId;
        }
      }
    } catch (error) {
      console.log("getByCustomer no disponible, intentando método alternativo");
    }

    console.log("No se encontró carrito existente para customer:", customerId);
    return null;
    
  } catch (error) {
    console.error("Error buscando carrito por customer ID:", error);
    return null;
  }
}


export async function findOrCreateCartForCustomer(): Promise<string | null> {
  const user = getCurrentUser();
  const customer = getCustomerIdentifier(user);
  
  if (!customer) {
    console.log("No hay customer ID disponible");
    return null;
  }

  try {
    let cartId = await findCartByCustomerId(customer);
    
    if (cartId) {
      sessionStorage.setItem(SHOPPING_CART_ID_KEY, cartId);
      console.log("Carrito existente encontrado y guardado:", cartId);
      return cartId;
    }

    console.log("Creando nuevo carrito para customer:", customer);
    const payload = buildPayload();
    
    const created = await cartAPI.create(payload);
    cartId = extractCartId(created);
    
    if (cartId) {
      sessionStorage.setItem(SHOPPING_CART_ID_KEY, cartId);
      console.log("Nuevo carrito creado:", cartId);
      return cartId;
    } else {
      console.error("No se pudo obtener ID del carrito creado");
      return null;
    }
    
  } catch (error) {
    console.error("Error en findOrCreateCartForCustomer:", error);
    return null;
  }
}

export async function upsertCartForCurrentUser(): Promise<string | null> {
  const user = getCurrentUser();
  const customer = getCustomerIdentifier(user);
  console.log("Sincronizando carrito para customer:", customer);
  
  if (!customer) return null;

  const payload = buildPayload();
  console.log("Payload enviado:", payload);

  try {
    let cartId = await findCartByCustomerId(customer);
    
    if (cartId) {
      try {
        const updated = await cartAPI.update(cartId, payload);
        console.log("Carrito actualizado exitosamente");
        
        sessionStorage.setItem(SHOPPING_CART_ID_KEY, cartId);
        return cartId;
      } catch (updateError) {
        console.error("Error actualizando carrito:", updateError);
        cartId = null;
      }
    }
    
    if (!cartId) {
      console.log("Creando nuevo carrito...");
      const created = await cartAPI.create(payload);
      cartId = extractCartId(created);
      
      if (cartId) {
        sessionStorage.setItem(SHOPPING_CART_ID_KEY, cartId);
        console.log("Nuevo carrito creado con ID:", cartId);
        return cartId;
      }
    }
    
    return cartId;
  } catch (error) {
    console.error("Error en upsertCartForCurrentUser:", error);
    return null;
  }
}

export async function loadCartForCurrentUser(): Promise<void> {
  const user = getCurrentUser();
  const customer = getCustomerIdentifier(user);
  
  if (!customer) {
    return;
  }

  try {
    const cartId = await findCartByCustomerId(customer);
    
    if (!cartId) {
      console.log("No hay carrito para cargar");
      cartStore.clear();
      sessionStorage.removeItem(SHOPPING_CART_ID_KEY);
      return;
    }

    console.log("Cargando carrito con ID:", cartId);

    sessionStorage.setItem(SHOPPING_CART_ID_KEY, cartId);

    const data = await cartAPI.getById(cartId);
    console.log("Datos del carrito recibidos:", data);
    
    const cartData = data as { product?: any[]; products?: any[] } | undefined;
    const products: Array<{ idProduct: string; quantity: number; price: number; name?: string }> =
      Array.isArray(cartData?.product) ? cartData.product : 
      Array.isArray(cartData?.products) ? cartData.products : [];

    console.log("Productos en el carrito:", products);

    cartStore.clear();

    products.forEach((p, index) => {
      const localId = `${p.idProduct}-${Date.now()}-${index}`;
      cartStore.addItem({
        id: localId,
        productId: p.idProduct,
        name: p.name || `Producto ${p.idProduct}`,
        price: Number(p.price) || 0,
        quantity: Number(p.quantity) || 1,
      } as any);
    });

    sessionStorage.setItem("cart", JSON.stringify(cartStore.getItems()));
    
    console.log(`Carrito cargado exitosamente con ${products.length} productos`);
    
  } catch (error) {
    console.error("Error al cargar carrito:", error);
    cartStore.clear();
    sessionStorage.removeItem(SHOPPING_CART_ID_KEY);
    sessionStorage.removeItem("cart");
  }
}

export async function ensureCartExists(): Promise<string | null> {
  const user = getCurrentUser();
  if (!user || user.role !== "customer") return null;

  const customer = getCustomerIdentifier(user);
  if (!customer) return null;

  try {
    return await findOrCreateCartForCustomer();
  } catch (error) {
    console.error("Error en ensureCartExists:", error);
    return null;
  }
}

export async function clearUserCart(): Promise<void> {
  const user = getCurrentUser();
  const customer = getCustomerIdentifier(user);
  
  cartStore.clear();
  
  sessionStorage.removeItem("cart");
  sessionStorage.removeItem(SHOPPING_CART_ID_KEY);
  
  if (customer) {
    try {
      const cartId = await findCartByCustomerId(customer);
      if (cartId) {
        await cartAPI.delete(cartId);
        console.log("Carrito eliminado del backend");
      }
    } catch (error) {
      console.error("Error al eliminar carrito del backend:", error);
    }
  }
}

export function getCurrentCartInfo(): { 
  hasCart: boolean; 
  cartId: string | null; 
  itemCount: number; 
  total: number; 
} {
  const cartId = sessionStorage.getItem(SHOPPING_CART_ID_KEY);
  const items = cartStore.getItems();
  const total = cartStore.getTotal();
  
  return {
    hasCart: !!cartId,
    cartId,
    itemCount: items.length,
    total
  };
}

export async function initializeCart(): Promise<void> {
  const user = getCurrentUser();
  if (!user || user.role !== "customer") {
    cartStore.clear();
    sessionStorage.removeItem("cart");
    sessionStorage.removeItem(SHOPPING_CART_ID_KEY);
    return;
  }

  console.log("Inicializando carrito para usuario:", user);

  try {
    await loadCartForCurrentUser();
    console.log("Carrito inicializado desde backend");
  } catch (error) {
    console.error("Error al inicializar carrito:", error);
    
    const localCart = sessionStorage.getItem("cart");
    if (localCart) {
      try {
        const items = JSON.parse(localCart);
        if (Array.isArray(items)) {
          cartStore.clear();
          items.forEach(item => cartStore.addItem(item));
          console.log("Carrito cargado desde sessionStorage como fallback:", items.length, "items");
        }
      } catch (parseError) {
        console.error("Error al parsear carrito local:", parseError);
      }
    }
  }
}

export async function syncCart(): Promise<void> {
  const user = getCurrentUser();
  if (!user || user.role !== "customer") return;

  const items = cartStore.getItems();
  if (items.length === 0) {
    try {
      await upsertCartForCurrentUser();
    } catch (error) {
      console.error("Error al sincronizar carrito vacío:", error);
    }
    return;
  }

  try {
    const cartId = await ensureCartExists();
    if (cartId) {
      await upsertCartForCurrentUser();
      console.log("Carrito sincronizado exitosamente");
    }
  } catch (error) {
    console.error("Error al sincronizar carrito:", error);
  }
}