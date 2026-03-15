// Initialize cart page
document.addEventListener('DOMContentLoaded', function() {
    renderCart();
    updateCartBadge();
});

// Render cart
function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContent = document.getElementById('cartContent');
    
    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h2>Your Cart is Empty</h2>
                <p>Start shopping to add items to your cart</p>
                <a href="products.html">Continue Shopping</a>
            </div>
        `;
        return;
    }
    
    const cartItemsHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.emoji}</div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Team: ${item.team} | Type: ${item.type}</p>
            </div>
            <div class="quantity-control">
                <button onclick="decreaseQuantity(${item.id})">−</button>
                <input type="number" value="${item.quantity}" readonly>
                <button onclick="increaseQuantity(${item.id})">+</button>
            </div>
            <div class="cart-item-price">₹${(item.price * item.quantity).toLocaleString()}</div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
        </div>
    `).join('');
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.18);
    const shipping = subtotal > 5000 ? 0 : 200;
    const total = subtotal + tax + shipping;
    
    cartContent.innerHTML = `
        <div class="cart-wrapper">
            <div class="cart-items">
                <h2>📦 ${cart.length} Item${cart.length > 1 ? 's' : ''}</h2>
                ${cartItemsHTML}
            </div>
            <div class="cart-summary">
                <h3>Order Summary</h3>
                <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>₹${subtotal.toLocaleString()}</span>
                </div>
                <div class="summary-row">
                    <span>Tax (18%):</span>
                    <span>₹${tax.toLocaleString()}</span>
                </div>
                <div class="summary-row">
                    <span>Shipping:</span>
                    <span>${shipping === 0 ? 'FREE' : '₹' + shipping}</span>
                </div>
                <div class="summary-row total">
                    <span>Total:</span>
                    <span style="color: #facc15;">₹${total.toLocaleString()}</span>
                </div>
                <button class="checkout-btn" onclick="checkout()">Proceed to Checkout</button>
                <button class="continue-shopping" onclick="window.location.href='products.html'">Continue Shopping</button>
            </div>
        </div>
    `;
}

// Increase quantity
function increaseQuantity(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(p => p.id === productId);
    if (item) {
        item.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartBadge();
    }
}

// Decrease quantity
function decreaseQuantity(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(p => p.id === productId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart = cart.filter(p => p.id !== productId);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartBadge();
    }
}

// Remove from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartBadge();
    showToast('Item removed from cart');
}

// Checkout
function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.18);
    const shipping = subtotal > 5000 ? 0 : 200;
    const total = subtotal + tax + shipping;
    
    alert(`
📋 ORDER SUMMARY
━━━━━━━━━━━━━━━━━━━━
Items: ${cart.length}
Subtotal: ₹${subtotal.toLocaleString()}
Tax (18%): ₹${tax.toLocaleString()}
Shipping: ${shipping === 0 ? 'FREE' : '₹' + shipping}
━━━━━━━━━━━━━━━━━━━━
TOTAL: ₹${total.toLocaleString()}

Thank you for shopping at IPL Shop!
This is a demo checkout.
    `);
    
    // Clear cart
    localStorage.removeItem('cart');
    renderCart();
    updateCartBadge();
}

// Update cart badge
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        badge.textContent = count;
    }
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
