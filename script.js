const wishlist = [];
const cart = [];

function toggleHeart(element, itemName, price) {
    element.classList.toggle('favorite');
    if (element.classList.contains('favorite')) {
        wishlist.push({ name: itemName, price: price });
    } else {
        const index = wishlist.findIndex(item => item.name === itemName);
        if (index !== -1) wishlist.splice(index, 1);
    }
    updateWishlist();
}

function addToCart(itemName, price) {
    alert(itemName + " added to cart!");
    cart.push({ name: itemName, price: price });
    updateCart();
}

function updateWishlist() {
    const wishlistItems = document.getElementById('wishlistItems');
    wishlistItems.innerHTML = '';
    wishlist.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
            <img src="images/fruits/${item.name.toLowerCase()}.jpg" alt="${item.name}">
            <div class="info">
                <h2>${item.name}</h2>
                <p>₹${item.price} per kg</p>
            </div>`;
        wishlistItems.appendChild(div);
    });
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
            <img src="images/fruits/${item.name.toLowerCase()}.jpg" alt="${item.name}">
            <div class="info">
                <h2>${item.name}</h2>
                <p>₹${item.price} per kg</p>
            </div>`;
        cartItems.appendChild(div);
    });
    document.getElementById('userDetails').classList.remove('hidden');
}

function showWishlist() {
    document.getElementById('wishlistPage').classList.remove('hidden');
    document.getElementById('cartPage').classList.add('hidden');
    document.getElementById('itemsPage').classList.add('hidden');
    updateWishlist();
}

function showCart() {
    document.getElementById('wishlistPage').classList.add('hidden');
    document.getElementById('cartPage').classList.remove('hidden');
    document.getElementById('itemsPage').classList.add('hidden');
    updateCart();
}

function goBack() {
    document.getElementById('wishlistPage').classList.add('hidden');
    document.getElementById('cartPage').classList.add('hidden');
    document.getElementById('itemsPage').classList.remove('hidden');
}

function togglePaymentMethod() {
    const paymentMethod = document.getElementById('paymentMethod').value;
    const upiField = document.getElementById('upiField');
    if (paymentMethod === 'online') {
        upiField.classList.remove('hidden');
    } else {
        upiField.classList.add('hidden');
    }
}

function calculateBill() {
    const userName = document.getElementById('userName').value;
    const userAddress = document.getElementById('userAddress').value;
    const userQuantity = document.getElementById('userQuantity').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const upiId = document.getElementById('upiId').value;

    let total = cart.reduce((sum, item) => sum + (item.price * userQuantity), 0);
    total += 40; // Adding delivery charge

    let paymentDetails = '';
    if (paymentMethod === 'online') {
        paymentDetails = `Paid via UPI ID: ${upiId}`;
    } else {
        paymentDetails = 'Cash on Delivery';
    }

    document.getElementById('confirmationPage').classList.remove('hidden');
    document.getElementById('wishlistPage').classList.add('hidden');
    document.getElementById('cartPage').classList.add('hidden');
    document.getElementById('itemsPage').classList.add('hidden');

    document.getElementById('billDetails').innerHTML = `
        <h2>Bill Details</h2>
        <p>Name: ${userName}</p>
        <p>Address: ${userAddress}</p>
        <p>Items: ${cart.map(item => item.name).join(', ')}</p>
        <p>Quantity: ${userQuantity} kg</p>
        <p>Total: ₹${total}</p>
        <p>${paymentDetails}</p>
    `;
}
document.addEventListener("DOMContentLoaded", function() {
    const cartPage = document.querySelector('.cart-page');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const removeItems = document.querySelectorAll('.remove-item');
    const quantityInputs = document.querySelectorAll('.quantity-input');

    if (cartPage) {
        checkoutBtn.addEventListener('click', () => {
            let total = 0;
            quantityInputs.forEach(input => {
                const quantity = parseInt(input.value);
                const price = parseFloat(input.closest('.item').querySelector('.item-price').innerText.replace('₹', ''));
                total += quantity * price;
            });
            const cod = confirm("Would you like to opt for Cash on Delivery? Additional ₹40 will be added to the total.");
            if (cod) total += 40;
            alert(`Your total bill is ₹${total.toFixed(2)}`);
        });

        removeItems.forEach(item => {
            item.addEventListener('click', () => {
                item.closest('.item').remove();
            });
        });
    }

    const wishlistPage = document.querySelector('.wishlist-page');
    if (wishlistPage) {
        removeItems.forEach(item => {
            item.addEventListener('click', () => {
                item.closest('.item').remove();
            });
        });
    }
});