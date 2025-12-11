const productsContainerId="products";
function renderProducts(products){
  const c=document.getElementById(productsContainerId); if(!c)return;
  c.innerHTML=products.map(p=>`
    <div class='product-card'>
      <img src='${p.image}' />
      <div>${p.title}</div>
      <div>${p.price}$</div>
      <button
        class='btn'
        data-id='${p.id}'
        data-title='${p.title.replace(/"/g,"&quot;")}'
        data-price='${p.price}'
        data-image='${p.image.replace(/"/g,"&quot;")}'
      >Add to cart</button>
    </div>
  `).join("");

  c.querySelectorAll("button").forEach(btn=>{
    btn.onclick=()=>{
      window.dispatchEvent(new CustomEvent("add-to-cart",{detail:{
        id:Number(btn.dataset.id),
        title:btn.dataset.title,
        price:Number(btn.dataset.price),
        image:btn.dataset.image
      }}));
    };
  });
}

fetch("https://fakestoreapi.com/products")
 .then(r=>r.json())
 .then(d=>renderProducts(d));
