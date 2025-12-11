const productsContainerId="products";
function renderProducts(products){
  const c=document.getElementById(productsContainerId); if(!c)return;
  c.innerHTML=products.map(p=>{
    const safeTitle=p.title.replace(/"/g,"&quot;");
    const safeImage=p.image.replace(/"/g,"&quot;");
    const shortDesc=p.description?`${p.description.slice(0,80)}...`:"";
    const rating=Number(p?.rating?.rate||4.5).toFixed(1);
    return `
      <div class='product-card'>
        <div class='product-img'>
          <img src='${safeImage}' alt='${safeTitle}' />
        </div>
        <div class='product-body'>
          <div class='product-top'>
            <p class='eyebrow'>${p.category}</p>
            <span class='price'>$${p.price}</span>
          </div>
          <h3 class='product-title'>${safeTitle}</h3>
          <p class='product-desc'>${shortDesc}</p>
        </div>
        <div class='product-footer'>
          <span class='rating'>⭐ ${rating}</span>
          <button
            class='btn solid'
            data-id='${p.id}'
            data-title='${safeTitle}'
            data-price='${p.price}'
            data-image='${safeImage}'
          >Savatga qo'shish</button>
        </div>
      </div>
    `;
  }).join("");

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
