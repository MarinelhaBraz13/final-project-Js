/* ================= REGISTER ================= */
function register() {
  const email = document.getElementById("email").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (email === "" || pass === "") {
    alert("Please fill all fields");
    return;
  }

  localStorage.setItem("email", email);
  localStorage.setItem("password", pass);

  alert("Register successful!");
  window.location.href = "login.html";
}


/* ===== LOGIN WITH EMAIL & PASSWORD ===== */
function validateLogin() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const savedEmail = localStorage.getItem("email");
  const savedPassword = localStorage.getItem("password");

  if (email === savedEmail && password === savedPassword) {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "home.html";
  } else {
    alert("Email or password incorrect!");
  }

  return false;
}


/* ================= PAGE PROTECTION ================= */
window.onload = function () {
  const page = window.location.pathname.split("/").pop();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (page === "login.html" && isLoggedIn !== "true") {
    window.location.href = "home.html";
  }

  if (page === "home.html" && isLoggedIn === "true") {
    window.location.href = "login.html";
  }
};

/* ================= LOGOUT ================= */
function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}

/* ===== SHOW HOME ===== */
function showHome() {
  document.getElementById("home").style.display = "grid";
  document.getElementById("product").style.display = "none";
}

/* ===== SHOW PRODUCTS ===== */
function showProducts() {
  document.getElementById("product").style.display = "grid";
  document.getElementById("home").style.display = "grid";
}

function searchProduct() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const products = document.querySelectorAll('.product');

  products.forEach(product => {
    const nameAttr = product.getAttribute('data-name') || "";
    const title = product.querySelector('h3')?.innerText.toLowerCase() || "";

    if (nameAttr.toLowerCase().includes(input) || title.includes(input)) {
      product.style.display = ""; 
    } else {
      product.style.display = "none";
    }
  });
}
// =================== GLOBAL VARIABLES ===================
let currentProduct = {};

// =================== MODAL ===================
function openModal(img) {
  const parent = img.parentElement;
  currentProduct = {
    name: parent.getAttribute('data-name'),
    description: parent.getAttribute('data-description'),
    price: parseFloat(parent.getAttribute('data-price')),
    img: img.src
  };
  document.getElementById('modalImg').src = currentProduct.img;
  document.getElementById('modalName').innerText = currentProduct.name;
  document.getElementById('modalDesc').innerText = currentProduct.description;
  document.getElementById('modalPrice').innerText = currentProduct.price;
  document.getElementById('modalQuantity').value = 1;
  document.getElementById('productModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('productModal').style.display = 'none';
}

// =================== ADD TO CART ===================
function addToCartModal() {
  const qty = parseInt(document.getElementById('modalQuantity').value);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  const existing = cart.find(item => item.name === currentProduct.name);
  if(existing) existing.quantity += qty;
  else cart.push({...currentProduct, quantity: qty});

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${qty} x ${currentProduct.name} added to cart!`);
}

function addToCart(btn) {
  const parent = btn.parentElement;
  const qty = parseInt(parent.querySelector('.quantity').value);
  const name = parent.getAttribute('data-name');
  const price = parseFloat(parent.getAttribute('data-price'));
  const img = parent.querySelector('img').src;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.name === name);
  if(existing) existing.quantity += qty;
  else cart.push({name, price, img, quantity: qty});

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${qty} x ${name} added to cart!`);
}

// =================== BUY NOW ===================
function buyNowModal() {
  const qty = parseInt(document.getElementById('modalQuantity').value);
  alert(`You selected BUY NOW:\n${qty} x ${currentProduct.name} - $${currentProduct.price * qty}`);
}

function buyNow(btn) {
  const parent = btn.parentElement;
  const qty = parseInt(parent.querySelector('.quantity').value);
  const name = parent.getAttribute('data-name');
  const price = parseFloat(parent.getAttribute('data-price'));
  alert(`You selected BUY NOW:\n${qty} x ${name} - $${price * qty}`);
}
// =================== UPDATE NAVBAR CART COUNT ===================
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElem = document.getElementById("cartCount");
  if(cartCountElem) cartCountElem.innerText = totalQty;
}

// Panggil setiap kali Add to Cart
function addToCartModal() {
  const qty = parseInt(document.getElementById('modalQuantity').value);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  const existing = cart.find(item => item.name === currentProduct.name);
  if(existing) existing.quantity += qty;
  else cart.push({...currentProduct, quantity: qty});

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount(); // <== update navbar
  alert(`${qty} x ${currentProduct.name} added to cart!`);
}

function addToCart(btn) {
  const parent = btn.parentElement;
  const qty = parseInt(parent.querySelector('.quantity').value);
  const name = parent.getAttribute('data-name');
  const price = parseFloat(parent.getAttribute('data-price'));
  const img = parent.querySelector('img').src;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.name === name);
  if(existing) existing.quantity += qty;
  else cart.push({name, price, img, quantity: qty});

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount(); // <== update navbar
  alert(`${qty} x ${name} added to cart!`);
}

// Jalankan saat halaman load untuk update badge
document.addEventListener("DOMContentLoaded", updateCartCount);
