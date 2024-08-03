document.addEventListener('DOMContentLoaded', function() {
    const milkaProductos = [
        { id: 1, nombre: "Alfajor Milka Mousse", precio: 10.00, img: "img/milka/producto1.webp", stock: 10 },
        { id: 2, nombre: "Milka Leche", precio: 20.00, img: "img/milka/producto2.webp", stock: 15 },
        { id: 3, nombre: "Chocopause Oreo", precio: 15.00, img: "img/milka/producto3.webp", stock: 20 },
        { id: 4, nombre: "Chocopause Leche", precio: 25.00, img: "img/milka/producto4.webp", stock: 5 },
        { id: 5, nombre: "Chocolate Aireado con Almendras", precio: 30.00, img: "img/milka/producto5.webp", stock: 54 },
        { id: 6, nombre: "Chocolate Relleno Dulce de Leche", precio: 35.00, img: "img/milka/producto6.webp", stock: 3 },
        { id: 7, nombre: "Chocolate Castañas con Caramelo", precio: 30.00, img: "img/milka/producto7.webp", stock: 12 },
        { id: 8, nombre: "Chocolate Relleno Oreo", precio: 30.00, img: "img/milka/producto8.webp", stock: 33 },
    ];

    const otrosProductos = [
        { id: 9, nombre: "Smirnoff", precio: 10.00, img: "img/producto1.webp", stock: 10, enOferta: false },
        { id: 10, nombre: "Lata Fernet", precio: 20.00, img: "img/producto2.webp", stock: 15, enOferta: true },
        { id: 11, nombre: "Dr Lemon Lata", precio: 15.00, img: "img/producto3.webp", stock: 20, enOferta: false },
        { id: 12, nombre: "Capelettinis", precio: 25.00, img: "img/producto4.webp", stock: 5, enOferta: true },
        { id: 13, nombre: "Lays", precio: 30.00, img: "img/producto5.jpeg", stock: 54, enOferta: false },
        { id: 14, nombre: "Cindor", precio: 35.00, img: "img/producto6.jpeg", stock: 3, enOferta: true },
        { id: 15, nombre: "Del Valle Naranja", precio: 35.00, img: "img/producto7.jpeg", stock: 12, enOferta: false },
        { id: 16, nombre: "Coca Cola Lata", precio: 35.00, img: "img/producto8.jpeg", stock: 33, enOferta: false },
        { id: 17, nombre: "Coca Cola", precio: 35.00, img: "img/producto9.jpeg", stock: 21, enOferta: false },
        { id: 18, nombre: "Vienisima", precio: 35.00, img: "img/producto10.jpeg", stock: 21, enOferta: true },
    ];

    const carnesProductos = [
        { id: 19, nombre: "Colita de Cuadril", precio: 10.00, img: "img/carnes/producto1.webp", stock: 10 },
        { id: 20, nombre: "Tapa de Nalga", precio: 20.00, img: "img/carnes/producto2.webp", stock: 15 },
        { id: 21, nombre: "Tapa de Asado", precio: 15.00, img: "img/carnes/producto3.webp", stock: 20 },
        { id: 22, nombre: "Ojo de Bife", precio: 25.00, img: "img/carnes/producto4.webp", stock: 5 },
        { id: 23, nombre: "Paleta en Currasco", precio: 30.00, img: "img/carnes/producto5.webp", stock: 54 },
        { id: 24, nombre: "Vacio", precio: 35.00, img: "img/carnes/producto6.webp", stock: 3 },
        { id: 25, nombre: "Matambre", precio: 30.00, img: "img/carnes/producto7.webp", stock: 12 },
        { id: 26, nombre: "Lomo", precio: 30.00, img: "img/carnes/producto8.webp", stock: 33 },
        { id: 27, nombre: "Roast Beef en Churrasco", precio: 30.00, img: "img/carnes/producto8.webp", stock: 33 },
        { id: 28, nombre: "Colita de Cuadril", precio: 30.00, img: "img/carnes/producto8.webp", stock: 33 },
    ];

    const url = window.location.pathname;
    let productos;
    let itemsPorSlider;
    if (url.includes('milka.html')) {
        productos = milkaProductos;
        itemsPorSlider = 4;
        localStorage.setItem('productos', JSON.stringify(milkaProductos));
    } else if (url.includes('carnes.html')) {
        productos = carnesProductos;
        itemsPorSlider = 5;
        localStorage.setItem('productos', JSON.stringify(carnesProductos));
    } else {
        productos = otrosProductos;
        itemsPorSlider = 5;
        localStorage.setItem('productos', JSON.stringify(otrosProductos));
    }

    const productosContainer = document.querySelector('.productos-container');

    const cantSliders = Math.ceil(productos.length / itemsPorSlider);

    for (let i = 0; i < cantSliders; i++) {
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item${i === 0 ? ' active' : ''}`;
        const productCard = document.createElement('div');
        productCard.className = 'd-flex w-100 justify-content-center';

        for (let j = 0; j < itemsPorSlider; j++) {
            const index = i * itemsPorSlider + j;
            if (index < productos.length) {
                const producto = productos[index];
                const productoElement = document.createElement('div');
                productoElement.className = 'producto';
                productoElement.dataset.id = producto.id;

                let precioDisplay = `<p class="precio">$${producto.precio.toFixed(2)}</p>`;
                if (producto.enOferta) {
                    const precioDescuento = (producto.precio * 0.9).toFixed(2);
                    precioDisplay = `<p class="precio"><span class="precio-original">$${producto.precio.toFixed(2)}</span> $${precioDescuento}</p>`;
                }

                productoElement.innerHTML = `
                    <img src="${producto.img}" alt="${producto.nombre}">
                    <div class="producto-info">
                        <h4>${producto.nombre}</h4>
                        ${precioDisplay}
                        <p class="stock">Stock: ${producto.stock}</p>
                        <div class="producto-actions">
                            <button class="like-button"><span>&#9829;</span></button>
                            <input type="number" class="cantidad-input" value="1" min="1" max="${producto.stock}">
                            <button class="btn btn-dark agregar-button" ${producto.stock === 0 ? 'disabled' : ''}>Agregar</button>
                        </div>
                    </div>
                `;

                productCard.appendChild(productoElement);
            }
        }

        carouselItem.appendChild(productCard);
        productosContainer.appendChild(carouselItem);
    }

    document.querySelectorAll('.cantidad-input').forEach(input => {
        input.addEventListener('input', function() {
            const maxStock = parseInt(this.max);
            if (this.value > maxStock) {
                this.value = maxStock;
            }
        });
    });

    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (!cartCount) return;
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalQuantity;
    }

    function updateProductStock(productId, quantity) {
        const productos = JSON.parse(localStorage.getItem('productos'));
        const productoIndex = productos.findIndex(p => p.id === productId);
        if (productoIndex >= 0) {
            productos[productoIndex].stock -= quantity;
            if (productos[productoIndex].stock <= 0) {
                productos[productoIndex].stock = 0;
            }
            localStorage.setItem('productos', JSON.stringify(productos));
            const productoElement = document.querySelector(`.producto[data-id='${productId}']`);
            if (productoElement) {
                const stockElement = productoElement.querySelector('.stock');
                stockElement.textContent = `Stock: ${productos[productoIndex].stock}`;
                const agregarButton = productoElement.querySelector('.agregar-button');
                agregarButton.disabled = productos[productoIndex].stock === 0;
            }
        }
    }

    document.querySelectorAll('.like-button').forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('liked');
        });
    });

    document.querySelectorAll('.agregar-button').forEach(button => {
        button.addEventListener('click', function() {
            const productoElement = this.closest('.producto');
            const cantidadInput = productoElement.querySelector('.cantidad-input');
            const quantity = parseInt(cantidadInput.value);
            const productId = parseInt(productoElement.dataset.id);

            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const cartItemIndex = cart.findIndex(item => item.id === productId);

            const productos = JSON.parse(localStorage.getItem('productos'));
            const producto = productos.find(p => p.id === productId);

            const precioFinal = producto.enOferta ? producto.precio * 0.9 : producto.precio;

            if (cartItemIndex >= 0) {
                cart[cartItemIndex].quantity += quantity;
                cart[cartItemIndex].precioFinal = precioFinal;
            } else {
                if (producto) {
                    cart.push({ ...producto, quantity, precioFinal });
                }
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            updateProductStock(productId, quantity);
        });
    });

    updateCartCount();

    const cartIcon = document.getElementById('cart-icon');
    const cartPopup = document.getElementById('cart-popup');
    const closeCartPopup = document.getElementById('close-cart-popup');
    const cartItemsList = document.getElementById('cart-items-list');
    const totalPriceElement = document.getElementById('total-price');
    const finalizePurchaseButton = document.getElementById('finalize-purchase');
    const paymentError = document.getElementById('payment-error');
    const purchaseToast = document.getElementById('purchase-toast');

    cartIcon.addEventListener('click', function() {
        cartItemsList.innerHTML = '';
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let totalPrice = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.img}" alt="${item.nombre}" class="cart-item-img">
                <div class="cart-item-details">
                    <span class="cart-item-name">${item.nombre}</span> - 
                    <span class="cart-item-price">$${item.precioFinal.toFixed(2)}</span> x 
                    <span class="cart-item-quantity">${item.quantity}</span>
                </div>
            `;
            cartItemsList.appendChild(cartItem);
            totalPrice += item.precioFinal * item.quantity;
        });

        totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
        cartPopup.style.display = 'flex';
    });

    closeCartPopup.addEventListener('click', function() {
        cartPopup.style.display = 'none';
    });

    finalizePurchaseButton.addEventListener('click', function() {
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
        if (!paymentMethod) {
            paymentError.style.display = 'block';
        } else {
            paymentError.style.display = 'none';
            cartPopup.style.display = 'none';
            localStorage.removeItem('cart');
            updateCartCount();

            const toast = new bootstrap.Toast(purchaseToast);
            toast.show();
        }
    });
});
