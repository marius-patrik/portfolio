import { IconShoppingCart } from '@tabler/icons-react';
import { Window } from 'liqid';
import { useState } from 'react';

interface EshopProps {
  isOpen: boolean;
  handleClose: () => void;
  zIndex: number;
  onFocus: () => void;
  resetKey?: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  emoji: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 79.99,
    category: 'Electronics',
    emoji: '🎧',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    category: 'Electronics',
    emoji: '⌚',
  },
  {
    id: 3,
    name: 'Running Shoes',
    price: 129.99,
    category: 'Fashion',
    emoji: '👟',
  },
  {
    id: 4,
    name: 'Backpack',
    price: 49.99,
    category: 'Accessories',
    emoji: '🎒',
  },
  { id: 5, name: 'Coffee Maker', price: 89.99, category: 'Home', emoji: '☕' },
  { id: 6, name: 'Desk Lamp', price: 34.99, category: 'Home', emoji: '💡' },
  {
    id: 7,
    name: 'Bluetooth Speaker',
    price: 59.99,
    category: 'Electronics',
    emoji: '🔊',
  },
  { id: 8, name: 'Yoga Mat', price: 29.99, category: 'Sports', emoji: '🧘' },
];

interface CartItem extends Product {
  quantity: number;
}

export const Eshop = ({
  isOpen,
  handleClose,
  zIndex,
  onFocus,
  resetKey,
}: EshopProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <Window
      title={
        <span className="flex items-center gap-2">
          <IconShoppingCart size={18} /> Eshop
        </span>
      }
      handleClose={handleClose}
      isOpen={isOpen}
      zIndex={zIndex}
      onFocus={onFocus}
      resetKey={resetKey}
    >
      <div className="h-full flex flex-col grow w-full gap-3">
        {/* Header with cart toggle */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {showCart ? 'Shopping Cart' : 'Products'}
          </h2>
          <button
            type="button"
            onClick={() => setShowCart(!showCart)}
            className="glass px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all hover:scale-105"
          >
            <IconShoppingCart size={18} />
            <span className="font-medium">{totalItems}</span>
          </button>
        </div>

        {showCart ? (
          /* Cart View */
          <div className="flex flex-col gap-2 flex-1 overflow-auto">
            {cart.length === 0 ? (
              <div className="flex-1 flex items-center justify-center opacity-70">
                Your cart is empty
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2 flex-1 overflow-auto">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="glass rounded-lg p-3 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{item.emoji}</span>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm opacity-70">
                            ${item.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="glass w-7 h-7 rounded-full flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="glass w-7 h-7 rounded-full flex items-center justify-center"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="glass w-7 h-7 rounded-full flex items-center justify-center ml-2"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="glass rounded-lg p-3 flex justify-between items-center">
                  <span className="font-semibold">Total:</span>
                  <span className="text-lg font-bold">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <button
                  type="button"
                  className="glass primary rounded-lg py-2 font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Checkout
                </button>
              </>
            )}
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-2 gap-2 flex-1 overflow-auto">
            {products.map((product) => (
              <div
                key={product.id}
                className="glass rounded-lg p-3 flex flex-col gap-2"
              >
                <div className="text-3xl text-center">{product.emoji}</div>
                <div className="text-sm font-medium text-center truncate">
                  {product.name}
                </div>
                <div className="text-xs opacity-70 text-center">
                  {product.category}
                </div>
                <div className="font-semibold text-center">
                  ${product.price.toFixed(2)}
                </div>
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="glass primary rounded-lg py-1.5 text-sm font-medium transition-all hover:scale-105 active:scale-95"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Window>
  );
};
