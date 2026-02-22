import { atom, computed } from 'nanostores';

export interface CartItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  size: string;
  quantity: number;
  color: string;
  image: string;
  arrivalDate: string;
}

const CART_STORAGE_KEY = 'grocery-store-cart';

const loadCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

export const $cartItems = atom<CartItem[]>(loadCart());
export const $isLoaded = atom<boolean>(false);

if (typeof window !== 'undefined') {
  $cartItems.set(loadCart());
  $isLoaded.set(true);
}

$cartItems.listen((items) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }
});

export function addToCart(item: CartItem) {
  const items = $cartItems.get();
  const existing = items.find(i => i.id === item.id && i.size === item.size);
  if (existing) {
    $cartItems.set(items.map(i =>
      i.id === item.id && i.size === item.size ? { ...i, quantity: i.quantity + item.quantity } : i
    ));
  } else {
    $cartItems.set([...items, { ...item, quantity: item.quantity || 1 }]);
  }
}

export function removeFromCart(id: string, size: string) {
  const items = $cartItems.get();
  $cartItems.set(items.filter(item => !(item.id === id && item.size === size)));
}

export function updateQuantity(id: string, quantity: number, size: string) {
  if (quantity <= 0) {
    removeFromCart(id, size);
    return;
  }
  const items = $cartItems.get();
  $cartItems.set(items.map(item =>
    item.id === id && item.size === size ? { ...item, quantity } : item
  ));
}

export function clearCart() {
  $cartItems.set([]);
}

export const $subtotal = computed($cartItems, items =>
  items.reduce((t, i) => t + i.price * i.quantity, 0)
);

export const $cartCount = computed($cartItems, items =>
  items.reduce((t, i) => t + i.quantity, 0)
);
