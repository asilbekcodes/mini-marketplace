import CartItem from "./CartItem.jsx";
export default function CartList({ cart, onRemove }) {
  if (!cart.length) {
    return (
      <div className='empty'>
        <div className='empty-icon'>🛒</div>
        <p className='empty-title'>Savat bo'sh</p>
        <p className='empty-sub'>Mahsulotlarni tanlab, savatga qo'shing</p>
      </div>
    );
  }
  return <>{cart.map(i => <CartItem key={i.id} item={i} onRemove={onRemove} />)}</>;
}
