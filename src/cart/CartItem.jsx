export default function CartItem({ item, onRemove }) {
  return (
    <div className='cart-item'>
      <div className='cart-item-header'>
        <span>{item.title}</span>
        <span>{(item.price * item.qty).toFixed(2)} $</span>
      </div>
      <div className='cart-item-meta'>
        <span>Qty: {item.qty}</span>
        <span>Price: {item.price.toFixed(2)} $</span>
      </div>
      <button className='btn' onClick={() => onRemove(item.id)}>Delete</button>
    </div>
  );
}
