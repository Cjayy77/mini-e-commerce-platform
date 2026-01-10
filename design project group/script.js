let cart = [];

const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
const cartBtn = document.getElementById('cart-btn');
const addCartButtons = document.querySelectorAll('.add-cart-btn');
const newsletterForm = document.getElementById('newsletter-form');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        productCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 0);
            } else {
                card.style.display = 'none';
            }
        });
    });
});

addCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // prevent product-card click handlers from also firing
        e.stopPropagation();
        const productName = button.getAttribute('data-product');
        const productCard = button.closest('.product-card');
        const price = productCard.querySelector('.price').textContent;

        cart.push({ name: productName, price: price });
        updateCartCount();

        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.background = 'var(--success-color)';

        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-plus"></i>';
            button.style.background = 'var(--primary-color)';
        }, 1500);
    });
});

// Show a small popup with a short description when a product card is clicked
productCards.forEach(card => {
    card.addEventListener('click', (e) => {
        e.stopPropagation();

        // Close any other open popups
        document.querySelectorAll('.product-popup').forEach(p => p.remove());

        // If this card already has a popup, toggle it
        const existing = card.querySelector('.product-popup');
        if (existing) {
            existing.remove();
            return;
        }

        const title = card.querySelector('h3')?.textContent || '';
        const category = card.querySelector('.category')?.textContent || '';
        const price = card.querySelector('.price')?.textContent || '';
        const description = card.getAttribute('data-description') || 'Product details coming soon.';

        const popup = document.createElement('div');
        popup.className = 'product-popup';
        popup.innerHTML = `
            <strong>${title}</strong>
            <p class="popup-category">${category}</p>
            <p class="popup-price">${price}</p>
            <p class="popup-desc">${description}</p>
        `;

        card.appendChild(popup);

        // Close popup when clicking anywhere else
        setTimeout(() => {
            function onDocClick() {
                popup.remove();
                document.removeEventListener('click', onDocClick);
            }
            document.addEventListener('click', onDocClick);
        }, 0);
    });
});

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.length;
}

cartBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        alert(`Cart (${cart.length} items):\n\n${cart.map(item => `${item.name} - ${item.price}`).join('\n')}`);
    } else {
        alert('Your cart is empty');
    }
});

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing with ${email}!`);
        newsletterForm.reset();
    });
}

const searchBtn = document.getElementById('search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        alert('Search feature coming soon!');
    });
}

const userBtn = document.getElementById('user-btn');
if (userBtn) {
    userBtn.addEventListener('click', () => {
         location.href = 'login.html';
    });
}

const viewAllBtn = document.querySelector('.view-all .btn');
if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
        alert('Redirecting to full products page...');
    });
}

const shopNowBtn = document.querySelector('.hero-content .btn');
if (shopNowBtn) {
    shopNowBtn.addEventListener('click', () => {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
}

// Simple client-side hash router (placeholder for login route)
function showLoginPlaceholder() {
    let rv = document.getElementById('route-view');
    if (!rv) {
        rv = document.createElement('div');
        rv.id = 'route-view';
        rv.style.padding = '80px 20px';
        rv.style.minHeight = '60vh';
        rv.style.display = 'flex';
        rv.style.alignItems = 'center';
        rv.style.justifyContent = 'center';

        const card = document.createElement('div');
        card.style.maxWidth = '420px';
        card.style.width = '100%';
        card.style.padding = '32px';
        card.style.borderRadius = '12px';
        card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
        card.style.background = '#fff';
        card.innerHTML = '<h2 style="margin-bottom:12px">Login</h2><p style="color:#6b7280;margin-bottom:16px">Login screen coming soon. You will be redirected here to sign in.</p>';

        rv.appendChild(card);
        const header = document.querySelector('header.navbar');
        if (header && header.parentNode) {
            header.parentNode.insertBefore(rv, header.nextSibling);
        } else {
            document.body.insertBefore(rv, document.body.firstChild);
        }
    }

    // Hide main content sections to focus on route view
    document.querySelectorAll('section, .hero, footer, .newsletter, .features, .products, .section-header').forEach(el => {
        if (el && el.id !== 'route-view') el.style.display = 'none';
    });
}

function restoreMainView() {
    const rv = document.getElementById('route-view');
    if (rv) rv.remove();
    document.querySelectorAll('section, .hero, footer, .newsletter, .features, .products, .section-header').forEach(el => {
        if (el) el.style.display = '';
    });
}

function router() {
    const hash = location.hash || '#home';
    if (hash === '#/login' || hash === '#login') {
        showLoginPlaceholder();
    } else {
        restoreMainView();
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
