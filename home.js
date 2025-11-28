const left = document.querySelector('.left');
const right = document.querySelector('.right');
const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.image');
let slideNumber = 0;

function showSlide(num) {
  if (num < 0) slideNumber = images.length - 1;
  else if (num >= images.length) slideNumber = 0;
  else slideNumber = num;
  slides.style.transform = `translateX(-${slideNumber * 800}px)`;
}

// Manual Controls
right.addEventListener('click', () => showSlide(slideNumber + 1));
left.addEventListener('click', () => showSlide(slideNumber - 1));

// Auto Move every 3 seconds
setInterval(() => {
  showSlide(slideNumber + 1);
}, 4000);

// --- UTILITY FUNCTIONS ---
function formatCurrency(amount) {
    return `Rs ${parseFloat(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

function showNotification(message, duration = 3000) {
    const notificationBox = document.getElementById("notificationBox");
    notificationBox.textContent = message;
    notificationBox.classList.add('show');
    
    setTimeout(() => {
        notificationBox.classList.remove('show');
    }, duration);
}


// --- DOM ELEMENTS ---
const productGrid = document.querySelector(".product-grid");
const modal = document.getElementById("productModal");
const modalTitle = document.getElementById("modalTitle");
const qtyInput = document.getElementById("qty");
const totalPrice = document.getElementById("totalPrice");
const buyNowBtn = document.getElementById("buyNowBtn"); 
const checkoutBtn = document.getElementById("checkoutBtn");
const notificationBox = document.getElementById("notificationBox");

// Modal sub-elements
const modalImg = document.getElementById("modalImg");
const modalPriceSpan = document.getElementById("modalPrice"); 
const modalDesc = document.getElementById("modalDesc");
const plusBtn = document.getElementById("plus");
const minusBtn = document.getElementById("minus");
const closeModalSpan = document.querySelector(".close");

let unitPriceValue = 0;

// Function to update the total price based on quantity
function updatePrice() {
    const quantity = parseInt(qtyInput.value) || 1;
    const newTotal = unitPriceValue * quantity;
    
    totalPrice.textContent = formatCurrency(newTotal);
}

// --- EVENT LISTENERS ---

// 1. Logic for opening the modal
document.querySelectorAll(".open-modal").forEach(btn => {
    btn.addEventListener("click", function(){
        
        const imgPath = this.dataset.img;
        const title = this.dataset.title;
        const price = this.dataset.price;
        const desc = this.dataset.desc;
        
        unitPriceValue = parseFloat(price);

        // Populate the modal
        modal.style.display = "flex";
        modalImg.src = imgPath;
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modalPriceSpan.textContent = formatCurrency(unitPriceValue);
        
        // Reset quantity and calculate the initial total
        qtyInput.value = 1;
        updatePrice();
    });
});

// 2. Buy Now Button - Redirect to Contact Page
buyNowBtn.addEventListener('click', function() {
    const currentTitle = modalTitle.textContent;
    const quantity = qtyInput.value;
    const totalCost = totalPrice.textContent;

    // Close modal
    modal.style.display = "none";
    
    // Redirect to contact page with product data
    const queryParams = new URLSearchParams({
        product: currentTitle,
        quantity: quantity,
        price: totalCost
    });
    
    window.location.href = `contact us.html?${queryParams.toString()}`;
});

// 3. Add to Cart Button - ALSO Redirect to Contact Page
checkoutBtn.addEventListener('click', function() {
    const currentTitle = modalTitle.textContent;
    const quantity = qtyInput.value;
    const totalCost = totalPrice.textContent;

    // Close modal
    modal.style.display = "none";
    
    // Redirect to contact page with product data
    const queryParams = new URLSearchParams({
        product: currentTitle,
        quantity: quantity,
        price: totalCost
    });
    
    window.location.href = `contact us.html?${queryParams.toString()}`;
});

// 4. Modal Closing Logic
closeModalSpan.addEventListener("click", ()=> modal.style.display = "none");

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// 5. Quantity Control Logic
const updatePriceAndQuantity = (delta) => {
    let currentQuantity = parseInt(qtyInput.value);
    let newQuantity = currentQuantity + delta;
    
    if(newQuantity >= 1) { 
        qtyInput.value = newQuantity;
        updatePrice(); 
    }
};

plusBtn.onclick = ()=> updatePriceAndQuantity(1);
minusBtn.onclick = ()=> updatePriceAndQuantity(-1);

// Prevent manual text input in quantity box
qtyInput.addEventListener('keydown', (e) => {
    e.preventDefault();
});



