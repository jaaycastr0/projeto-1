//carrinho



function addToCart(name, price, quantity) {
    let selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];

    // Verifica se o item já está no carrinho
    let existingItem = selectedItems.find(item => item.name === name);

    if (existingItem) {
        // Se o item já está no carrinho, aumenta a quantidade
        existingItem.quantity += parseInt(quantity);
    } else {
        // Se o item não está no carrinho, adiciona-o com a quantidade especificada
        selectedItems.push({
            name: name,
            price: price,
            quantity: parseInt(quantity)
        });
    }

    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    alert(`${name} (x${quantity}) foi adicionado ao carrinho.`);
}

function goToCart() {
    window.location.href = 'checkout.html'; 
}

function loadCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');

    let selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    let totalPrice = 0;

    cartItemsContainer.innerHTML = '';

    selectedItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerText = `${item.name} (x${item.quantity}) - R$ ${(item.price * item.quantity).toFixed(2)}`;
        cartItemsContainer.appendChild(itemElement);

        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.innerText = totalPrice.toFixed(2);
    localStorage.setItem('totalPrice', totalPrice.toFixed(2));
}

if (window.location.pathname.includes('checkout.html')) {
    window.onload = loadCart;
}


function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    const cartContainer = document.getElementById('cartItems');
    cartContainer.innerHTML = '';  
    let total = 0;

    cartItems.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <span>${item.name}</span>
            <input type="number" value="${item.quantity}" min="1" data-index="${index}" onchange="updateQuantity(this)">
            <span>R$ ${itemTotal.toFixed(2)}</span>
            <button onclick="removeItem(${index})">Remover</button>
        `;
        cartContainer.appendChild(itemElement);
    });

    document.getElementById('totalPrice').innerText = total.toFixed(2);
    localStorage.setItem('totalPrice', total.toFixed(2)); 
}


function updateQuantity(input) {
    const index = input.dataset.index;
    const cartItems = JSON.parse(localStorage.getItem('selectedItems'));
    cartItems[index].quantity = parseInt(input.value);

    if (cartItems[index].quantity <= 0) {
        cartItems.splice(index, 1);
    }

    localStorage.setItem('selectedItems', JSON.stringify(cartItems));
    loadCart(); 
}


function removeItem(index) {
    const cartItems = JSON.parse(localStorage.getItem('selectedItems'));
    cartItems.splice(index, 1);
    localStorage.setItem('selectedItems', JSON.stringify(cartItems));
    loadCart(); 
}


function addMoreItems() {
    window.location.href = 'index.html';
}


function finalizeOrder() {
    window.location.href = 'checkout.html';
}















//Checkout






function loadCheckout() {
    const cartItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    const summaryContainer = document.getElementById('orderSummary');
    summaryContainer.innerHTML = '';  // Limpa o resumo antes de recarregar os itens
    let total = parseFloat(localStorage.getItem('totalPrice')) || 0; // Recupera o valor total do localStorage

    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;

        const itemElement = document.createElement('div');
        itemElement.className = 'summary-item';
        itemElement.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>R$ ${itemTotal.toFixed(2)}</span>
        `;
        summaryContainer.appendChild(itemElement);
    });

    document.getElementById('totalPrice').innerText = total.toFixed(2);
}






function confirmOrder() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('paymentMethod').value;

    if (name && address && paymentMethod) {
        alert('Pedido confirmado! Obrigado, ' + name + '.');
        localStorage.clear();
        window.location.href = 'index.html';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}


function cancelOrder() {
    if (confirm('Você realmente deseja cancelar o pedido?')) {
        localStorage.clear();
        window.location.href = 'index.html';
    }
}

if (window.location.pathname.includes('cart.html')) {
    window.onload = loadCart;
} else if (window.location.pathname.includes('checkout.html')) {
    window.onload = loadCheckout;
}




//recibo




function loadReceipt() {
    const receiptItemsContainer = document.getElementById('receiptItems');
    const receiptTotalElement = document.getElementById('receiptTotal');
    const receiptNameElement = document.getElementById('receiptName');
    const receiptAddressElement = document.getElementById('receiptAddress');
    const receiptPaymentMethodElement = document.getElementById('receiptPaymentMethod');

    let selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    let totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;
    let name = localStorage.getItem('name') || '';
    let address = localStorage.getItem('address') || '';
    let paymentMethod = localStorage.getItem('paymentMethod') || '';

    receiptItemsContainer.innerHTML = '';
    selectedItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerText = `${item.name} (x${item.quantity}) - R$ ${(item.price * item.quantity).toFixed(2)}`;
        receiptItemsContainer.appendChild(itemElement);
    });

    receiptTotalElement.innerText = totalPrice.toFixed(2);
    receiptNameElement.innerText = name;
    receiptAddressElement.innerText = address;
    receiptPaymentMethodElement.innerText = paymentMethod;

  
    localStorage.removeItem('selectedItems');
    localStorage.removeItem('totalPrice');
    localStorage.removeItem('name');
    localStorage.removeItem('address');
    localStorage.removeItem('paymentMethod');
}

if (window.location.pathname.includes('recibo.html')) {
    window.onload = loadReceipt;
}






