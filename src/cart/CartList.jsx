import CartItem from "./CartItem.jsx";
export default function CartList({ cart, onRemove }) {
  if (!cart.length) return <p>Cart is empty</p>;
  return <>{cart.map(i => <CartItem key={i.id} item={i} onRemove={onRemove} />)}</>;
}
