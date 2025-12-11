import { useEffect, useState } from "react";
import "./styles.css";
import "./products-vanilla.js";
import CartList from "./cart/CartList.jsx";

const getInitialCart = () => {
  const saved = localStorage.getItem("mini_market_cart");
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export default function App() {
  const [cart, setCart] = useState(getInitialCart);

  useEffect(() => {
    localStorage.setItem("mini_market_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    function add(e) {
      const { id, title, price, image } = e.detail;
      setCart(prev => {
        const exist = prev.find(x => x.id === id);
        if (exist) {
          return prev.map(x => x.id === id ? { ...x, qty: x.qty + 1, image: x.image || image } : x);
        }
        return [...prev, { id, title, price, image, qty: 1 }];
      });
    }
    window.addEventListener("add-to-cart", add);
    return () => window.removeEventListener("add-to-cart", add);
  }, []);

  const removeItem = id => setCart(p => p.filter(x => x.id !== id));
  const items = cart.reduce((s, x) => s + x.qty, 0);
  const total = cart.reduce((s, x) => s + x.qty * x.price, 0).toFixed(2);

  return (
    <div className='app-container'>
      <div className='layout'>
        <section className='section'>
          <h2>Products</h2>
          <div id='products' className='products-list'></div>
        </section>

        <section className='section'>
          <h2>Cart</h2>
          <CartList cart={cart} onRemove={removeItem} />
          <p>Items: {items}</p>
          <p>Total: {total}$</p>
        </section>
      </div>
    </div>
  );
}
