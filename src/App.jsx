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
    <div className='app-shell'>
      <header className='app-header'>
        <div className='brand'>
          <span className='brand-mark'>mini</span>
          <div>
            <h1>Mini Marketplace</h1>
            <p className='sub'>Tezkor va qulay onlayn savdo maydoni</p>
          </div>
        </div>
        <div className='header-stats'>
          <div className='stat'>
            <span className='stat-label'>Savatdagi mahsulot</span>
            <span className='stat-value'>{items}</span>
          </div>
          <div className='stat'>
            <span className='stat-label'>Jami summa</span>
            <span className='stat-value'>${total}</span>
          </div>
        </div>
      </header>

      <main className='grid'>
        <section className='panel highlight'>
          <div className='panel-head'>
            <div>
              <p className='eyebrow'>Yangi kelgan tovarlar</p>
              <h2>Mahsulotlar</h2>
            </div>
            <span className='pill'>+ Savatga qo&apos;shish uchun bosing</span>
          </div>
          <div id='products' className='products-grid'></div>
        </section>

        <section className='panel'>
          <div className='panel-head'>
            <div>
              <p className='eyebrow'>Savatingiz</p>
              <h2>Cart</h2>
            </div>
            <span className='pill soft'>${total}</span>
          </div>
          <CartList cart={cart} onRemove={removeItem} />
          <div className='cart-summary'>
            <div>
              <p className='label'>Mahsulotlar soni</p>
              <p className='value'>{items}</p>
            </div>
            <div>
              <p className='label'>To&apos;lov</p>
              <p className='value accent'>${total}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
