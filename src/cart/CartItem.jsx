export default function CartItem({ item, onRemove }) {
  return (
    <div className='cart-item'>
      {item.image && (
        <div className='cart-item-img'>
          <img src={item.image} alt={item.title} />
        </div>
      )}
      <div className='cart-item-info'>
        <div className='cart-item-header'>
          <span>{item.title}</span>
          <span>{(item.price * item.qty).toFixed(2)} $</span>
        </div>
        <div className='cart-item-meta'>
          <span>Qty: {item.qty}</span>
          <span>Price: {item.price.toFixed(2)} $</span>
        </div>
        <button className='btn ghost' onClick={() => onRemove(item.id)}>O'chirish</button>
      </div>
    </div>
  );
}
