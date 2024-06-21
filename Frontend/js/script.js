// Get the cart items container
const cartItemsContainer = document.querySelector('.cart-items-container');

// Get the cart total element
const cartTotalElement = document.querySelector('#cart-total');

// Get the cart count element
const cartCountElement = document.querySelector('.cart-btn span');

// Function to add product to cart
function addProductToCart(productName, productPrice, productImage) {
    // Extract the price from the productPrice string
    const priceString = productPrice.replace('Price: ', '');
    const price = parseInt(priceString.replace('Ksh ', ''));

    // Create a new cart item
    const cartItem = {
        name: productName,
        price: price,
        image: productImage,
        quantity: 1,
    };

    // Get the cart from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const existingItem = cart.find((item) => item.name === productName);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(cartItem);
    }

    // Store the cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart items container
    updateCartItemsContainer();

    // Update the cart count
    updateCartCount();
}

// Function to update the cart items container
function updateCartItemsContainer() {
    // Get the cart from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Clear the cart items container
    cartItemsContainer.innerHTML = '';

    // Add each cart item to the container
    cart.forEach((item) => {
        const cartItemHTML = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Price: Ksh ${item.price}</p>
                <p>Quantity: <span>${item.quantity}</span></p>
                <button class="increment-btn">+</button>
                <button class="decrement-btn">-</button>
                <button class="remove-btn">Remove</button>
            </div>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
    });

    // Update the cart total
    updateCartTotal();
}

// Function to update the cart total
function updateCartTotal() {
    // Get the cart from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Calculate the total
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Update the cart total element
    cartTotalElement.textContent = total;
}

// Function to update the cart count
function updateCartCount() {
    // Get the cart from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Calculate the total quantity
    let totalCount = cart.reduce((count, item) => count + item.quantity, 0);

    // Update the cart count element
    cartCountElement.textContent = totalCount;
}

// Add event listeners to the add-to-cart buttons
document.querySelectorAll('.add-to-cart-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
        const productCard = event.target.closest('.product-card');
        const productName = productCard.querySelector('p').textContent;
        const productPrice = productCard.querySelector('p:nth-child(3)').textContent;
        const productImage = productCard.querySelector('img').src;
        addProductToCart(productName, productPrice, productImage);
    });
});

// Event listener for cart operations
cartItemsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('increment-btn')) {
        // Increment quantity
        const productName = event.target.closest('.cart-item').querySelector('h3').textContent;
        incrementProductQuantity(productName);
    } else if (event.target.classList.contains('decrement-btn')) {
        // Decrement quantity
        const productName = event.target.closest('.cart-item').querySelector('h3').textContent;
        decrementProductQuantity(productName);
    } else if (event.target.classList.contains('remove-btn')) {
        // Remove product
        const productName = event.target.closest('.cart-item').querySelector('h3').textContent;
        removeProductFromCart(productName);
    }
});

// Function to increment product quantity
function incrementProductQuantity(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find((item) => item.name === productName);
    if (item) {
        item.quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartItemsContainer();
        updateCartCount();
    }
}

// Function to decrement product quantity
function decrementProductQuantity(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find((item) => item.name === productName);
    if (item && item.quantity > 1) {
        item.quantity--;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartItemsContainer();
        updateCartCount();
    } else if (item && item.quantity === 1) {
        removeProductFromCart(productName);
    }
}

// Function to remove product from cart
function removeProductFromCart(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter((item) => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartItemsContainer();
    updateCartCount();
}

// Sign Up Form Validation
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');

    if (signupForm) {
        // Attach a submit event listener to the form element
        signupForm.addEventListener('submit', function (event) {
            console.log('Form submitted');
            event.preventDefault();
            const username = document.getElementById('signup-name').value.trim();
            const email = document.getElementById('signup-email').value.trim();
            const password = document.getElementById('signup-password').value.trim();
            const repeatPassword = document.getElementById('signup-password-repeat').value.trim();
            const agreeCheckbox = document.getElementById('agree-checkbox');

            if (!username || !email || !password || !repeatPassword) {
                alert('Please fill in all fields');
                return;
            }

            if (password !== repeatPassword) {
                alert('Passwords do not match');
                return;
            }

            if (!agreeCheckbox.checked) {
                alert('Please agree to the terms and conditions');
                return;
            }

            // Make a POST request to the backend server to create a new user
            fetch('http://localhost:5500/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            .then(response => response.json())
            .then(data => {
                // Handle response data
                console.log(data);
                //  Redirect to index.html after successful signup
                window.location.href = 'index.html';
            })
            .catch(error => {
                // Handle error
                console.error(error);
            });
        });
    }
});
// Login Form Validation
const loginForm = document.getElementById('login-form');

if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        // Redirect to main.html after successful login
        window.location.href = 'index.html';
    });
}

// Update the cart items container and cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartItemsContainer();
    updateCartCount();
});

// Function to filter products
function filterProducts(category) {
    const productsContainer = document.querySelector('.products-container');
    const products = productsContainer.querySelectorAll('.product-card');

    products.forEach((product) => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Function to sort products
function sortProducts(sortBy) {
    const productsContainer = document.querySelector('.products-container');
    const products = productsContainer.querySelectorAll('.product-card');

    let sortedProducts;
    switch (sortBy) {
        case 'price-asc':
            sortedProducts = [...products].sort((a, b) => a.dataset.price - b.dataset.price);
            break;
        case 'price-desc':
            sortedProducts = [...products].sort((a, b) => b.dataset.price - a.dataset.price);
            break;
        case 'name-asc':
            sortedProducts = [...products].sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
            break;
        case 'name-desc':
            sortedProducts = [...products].sort((a, b) => b.dataset.name.localeCompare(a.dataset.name));
            break;
        default:
            sortedProducts = products;
    }

    productsContainer.innerHTML = '';
    sortedProducts.forEach((product) => {
        productsContainer.appendChild(product);
    });
}

// Event listeners for filtering and sorting
document.querySelectorAll('.filter-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
        const category = event.target.dataset.category;
        filterProducts(category);
    });
});

document.querySelectorAll('.sort-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
        const sortBy = event.target.dataset.sortby;
        sortProducts(sortBy);
    });
});


