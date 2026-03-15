// Product Database with Team-specific Items
const productsDB = [
    // CSK Products
    { id: 1, team: 'CSK', name: 'CSK Home Jersey 2026', type: 'Jersey', price: 1999, emoji: '👕', description: 'Official CSK home match jersey', image: 'csk jersey.png' },
    { id: 2, team: 'CSK', name: 'CSK Away Jersey', type: 'Jersey', price: 1899, emoji: '👕', description: 'Official CSK away jersey', image: 'csk2.png' },
    { id: 3, team: 'CSK', name: 'CSK Training Kit', type: 'Kit', price: 2499, emoji: '🏃', description: 'Complete training kit set', image: 'csk trainerkit.jpeg' },
    { id: 4, team: 'CSK', name: 'CSK Polo Shirt', type: 'Merchandise', price: 899, emoji: '👕', description: 'Premium polo shirt', image: 'csk3.jpeg' },
    
    // MI Products
    { id: 5, team: 'MI', name: 'MI Home Jersey 2026', type: 'Jersey', price: 1999, emoji: '👕', description: 'Official MI home match jersey', image: 'mi 1.webp' },
    { id: 6, team: 'MI', name: 'MI Away Jersey', type: 'Jersey', price: 1899, emoji: '👕', description: 'Official MI away jersey', image: 'mi2.webp' },
    { id: 7, team: 'MI', name: 'MI models', type: 'Kit', price: 2499, emoji: '🏃', description: 'Complete training kit set', image: 'mi3.webp' },
    { id: 8, team: 'MI', name: 'MI assesaries', type: 'Merchandise', price: 1499, emoji: '🧥', description: 'Team official jacket', image: 'mi4.webp' },
    
    // RCB Products
    { id: 9, team: 'RCB', name: 'RCB Home Jersey 2026', type: 'Jersey', price: 1999, emoji: '👕', description: 'Official RCB home match jersey', image: 'rcb1.jpg' },
    { id: 10, team: 'RCB', name: 'RCB Polo shirt', type: 'Jersey', price: 1899, emoji: '👕', description: 'Official RCB away jersey', image: 'rcb2.jpg' },
    { id: 11, team: 'RCB', name: 'RCB jacket', type: 'Kit', price: 2499, emoji: '🏃', description: 'Complete training kit set', image: 'rcb4.jpg' },
    { id: 12, team: 'RCB', name: 'RCB sneakers', type: 'Merchandise', price: 599, emoji: '🧢', description: 'Team official cap', image: 'rcb3.jpg' },
    
    // KKR Products
    { id: 13, team: 'KKR', name: 'KKR Home Jersey ', type: 'Jersey', price: 1999, emoji: '👕', description: 'Official KKR home match jersey', image: 'kkr1.webp' },
    { id: 14, team: 'KKR', name: 'KKR hoodie', type: 'Jersey', price: 1899, emoji: '👕', description: 'Official KKR away jersey', image: 'kkr2.webp' },
    { id: 15, team: 'KKR', name: 'KKR figure', type: 'Kit', price: 2499, emoji: '🏃', description: 'Complete training kit set', image: 'kkr3.webp' },
    { id: 16, team: 'KKR', name: 'KKR caps', type: 'Merchandise', price: 1799, emoji: '🧥', description: 'Team official hoodie', image: 'kkr4.webp' },
    
  
    
  
    
    
    
    // GT Products
    { id: 33, team: 'GT', name: 'GT Home Jersey 2026', type: 'Jersey', price: 1999, emoji: '👕', description: 'Official GT home match jersey', image: 'gt1.webp' },
    { id: 34, team: 'GT', name: 'GT Training Kit', type: 'Jersey', price: 1899, emoji: '👕', description: 'Official GT away jersey', image: 'gt2.webp' },
    { id: 35, team: 'GT', name: 'GT Caps', type: 'Kit', price: 2499, emoji: '🏃', description: 'Complete training kit set', image: 'gt3.webp' },
    { id: 36, team: 'GT', name: 'GT Flipflops', type: 'Merchandise', price: 299, emoji: '💪', description: 'Team official wristband', image: 'gt4.webp' },
    

];    

let currentFilter = 'all';

// Image lookup for teams (fallbacks for missing product.image)
const productTeamImages = {
    CSK: 'csk jersey.png',
    MI: 'MIoutline.avif',
    RCB: 'RCBoutline.avif',
    KKR: 'KKRoutline.avif',
    RR: 'RR_Logo.webp',
    SRH: 'SRHoutline.avif',
    DC: 'DCoutline.avif',
    PBKS: 'PBKSoutline.avif',
    GT: 'GToutline.avif',
    LSG: 'LSGoutline.avif',
};

function getProductImage(product) {
    return product.image || productTeamImages[product.team] || 'trophy.avif';
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadProducts('all');
    updateCartBadge();
});

// Filter by team
function filterByTeam(team) {
    currentFilter = team;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    loadProducts(team);
}

// Load and display products
function loadProducts(team) {
    const container = document.getElementById('productsContainer');
    const emptyState = document.getElementById('emptyState');
    
    let filteredProducts = productsDB;
    
    if (team !== 'all') {
        filteredProducts = productsDB.filter(p => p.team === team);
    }
    
    if (filteredProducts.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    container.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${getProductImage(product)}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-team">${product.team}</div>
                <div class="product-name">${product.name}</div>
                <p class="product-description">${product.description}</p>
                <div class="product-details">
                    <span>📦 ${product.type}</span>
                    <span>⭐ ${Math.floor(Math.random() * 2) + 4}.5/5</span>
                </div>
                <div class="product-footer">
                    <div class="product-price">₹${product.price}</div>
                    <button class="btn-add-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Add to cart
function addToCart(productId) {
    const product = productsDB.find(p => p.id === productId);
    if (!product) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    showToast(`${product.name} added to cart!`);
}

// Update cart badge
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

// Show toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `✓ ${message}`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideInToast 0.4s ease-out reverse';
        setTimeout(() => toast.remove(), 400);
    }, 2000);
}
