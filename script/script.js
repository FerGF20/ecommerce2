/* NAV SCROLL */

const navbar = document.querySelector('.nav__container')

if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY >= 50) {
        navbar.classList.add('scroll__nav')
      } else {
        navbar.classList.remove('scroll__nav')
      }
    })
  }

/* MENU SHOW */

const iconMenu = document.querySelector('.icon__menu');
const menu = document.querySelector('.nav__menu');

iconMenu.addEventListener('click', function(){
    menu.classList.toggle('menu__show');
})

/* CART SHOW*/

const iconCart = document.querySelector('.nav__cart');
const cart = document.querySelector('.cart');

iconCart.addEventListener('click', function(){
    cart.classList.toggle('cart__show');
})

/* ADD TO CART */

const products = [{
  id: 1,
  name: 'Hoodies',
  price: 14.00,
  image: './imagens/featured1.png',
  category: 'hoodies',
  amount: 1
},
{
  id: 2,
  name: 'Shirts',
  price: 24.00,
  image: './imagens/featured2.png',
  category: 'shirts',
  amount: 1
},
{
  id: 3,
  name: 'Sweatshirts',
  price: 24.00,
  image: './imagens/featured3.png',
  category: 'sweatshirts',
  amount: 1
}
];

const productsContainer = document.querySelector('.products__container');
const cartContainer = document.getElementById('cart__container');
const clearButton = document.getElementById('clear-cart');
const cartCount = document.getElementById('cart__counter');
const totalPrice = document.getElementById('cart-total');

let cartContent = [];

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('cartContent')){
    cartContent = JSON.parse(localStorage.getItem('cartContent'));
    updateCart();
  }
})

clearButton.addEventListener('click', ()=> {
  cartContent.length = 0;
  updateCart();
})

products.forEach((product) => {
  const div = document.createElement('article')
  div.classList.add('product__box')
  div.innerHTML = `
    <div class="product__image">
     <img src="${product.image}" alt="">
    </div>
    <div id="add${product.id}" class="product__add">
      <h2>+</h2>
    </div>
    <div class="product__description">
      <h2>$${product.price}.00<span> | ${product.category}</span></h2>
      <h3>${product.name}</h3>
    </div>
  `
  productsContainer.appendChild(div);

  const button = document.getElementById(`add${product.id}`);
  
  button.addEventListener('click', () => {
    addToCart(product.id);
  })

});

const addToCart = (prodId) => {
  const exist = cartContent.some (prod => prod.id === prodId);

  if (exist){
    const prod = cartContent.map (prod => {
      if (prod.id === prodId){
        prod.amount++;
      }
    })
  } else {

  const item = products.find((prod) => prod.id === prodId);
  cartContent.push(item);
}
updateCart();
}

const deleteOfCart = (prodId) => {
  const item = cartContent.find((prod) => prod.id === prodId);
  const index = cartContent.indexOf(item);
  cartContent.splice(index, 1);
  updateCart()
}

const updateCart = () => {

  cartContainer.innerHTML = "";

  cartContent.forEach((prod) => {
    const div = document.createElement('div');
    div.className = ('product__in__cart');
    div.innerHTML = `
    <img class="img__cart" src="${prod.image}" alt="">
    <p>Nombre: ${prod.name}<span> | ${prod.category}</span></p>
    <p>Precio: ${prod.price}</p>
    <p>Cantidad: ${prod.amount}</p>
    <button type="button" id="delete${prod.id}" class="delete__button">Eliminar</button>
    `

    cartContainer.appendChild(div);

    localStorage.setItem('cartContent', JSON.stringify(cartContent));

    const deleteButton = document.getElementById(`delete${prod.id}`);

    deleteButton.addEventListener('click', () => {
      deleteOfCart(prod.id);
    })
  })
  cartCount.innerText = cartContent.length;
  totalPrice.innerText = cartContent.reduce((acc, prod) => acc + prod.price, 0);
  
}