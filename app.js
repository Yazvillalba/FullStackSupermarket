document.addEventListener('DOMContentLoaded', function() {
    const productos = [
        { id: 1, nombre: "Smirnoff", precio: 10.00, img: "img/producto1.webp", stock: 10 },
        { id: 2, nombre: "Lata Fernet", precio: 20.00, img: "img/producto2.webp", stock: 15 },
        { id: 3, nombre: "Dr Lemon Lata", precio: 15.00, img: "img/producto3.webp", stock: 20 },
        { id: 4, nombre: "Capelettinis", precio: 25.00, img: "img/producto4.webp", stock: 5 },
        { id: 5, nombre: "Lays", precio: 30.00, img: "img/producto5.jpeg", stock: 54 },
        { id: 6, nombre: "Cindor", precio: 35.00, img: "img/producto6.jpeg", stock: 3 },
        { id: 7, nombre: "Del Valle Naranja", precio: 35.00, img: "img/producto7.jpeg", stock: 12 },
        { id: 8, nombre: "Coca Cola Lata", precio: 35.00, img: "img/producto8.jpeg", stock: 33 },
        { id: 9, nombre: "Coca Cola", precio: 35.00, img: "img/producto9.jpeg", stock: 21 },
        { id: 10, nombre: "Vienisima", precio: 35.00, img: "img/producto10.jpeg", stock: 21 },
    ];

    //Guardamos en LocalStorage los datos iniciales de los productos
    localStorage.setItem('productos', JSON.stringify(productos));

    const productosContainer = document.querySelector('.productos-container');
    const itemsPorSlider = 5;  //asigna la cantidad de productos a mostrar por slider
    const cantSliders = Math.ceil(productos.length / itemsPorSlider); //calcula las sliders a tener

    for (let i = 0; i < cantSliders; i++) {
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item${i === 0 ? ' active' : ''}`; //seteamos la clase al item carrousel
        const productCard = document.createElement('div');
        productCard.className = 'd-flex w-100 justify-content-center';

        for (let j = 0; j < itemsPorSlider; j++) {
            const index = i * itemsPorSlider + j;
            if (index < productos.length) {
                const producto = productos[index];
                const productoElement = document.createElement('div');
                productoElement.className = 'producto';
                productoElement.dataset.id = producto.id;

                productoElement.innerHTML = `
                    <img src="${producto.img}" alt="${producto.nombre}">
                    <div class="producto-info">
                        <h4>${producto.nombre}</h4>
                        <p class="precio">$${producto.precio.toFixed(2)}</p>
                        <p class="stock">Stock: ${producto.stock}</p>
                        <div class="producto-actions">
                            <button class="like-button"><span>&#9829;</span></button>
                            <input type="number" class="cantidad-input" value="1" min="1">
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

    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalQuantity;
    }

    function updateProductStock(productId, quantity) {
        const productos = JSON.parse(localStorage.getItem('productos'));
        const productoIndex = productos.findIndex(p => p.id === productId);
        if (productoIndex >= 0) {
            productos[productoIndex].stock -= quantity;
            if (productos[productoIndex].stock < 0) {
                productos[productoIndex].stock = 0; //para evitar stock negativo
            }
            localStorage.setItem('productos', JSON.stringify(productos));
            const productoElement = document.querySelector(`.producto[data-id='${productId}']`);
            if (productoElement) {
                const stockElement = productoElement.querySelector('.stock'); //actualiza el stock en la card
                stockElement.textContent = `Stock: ${productos[productoIndex].stock}`;
                const agregarButton = productoElement.querySelector('.agregar-button');
                agregarButton.disabled = productos[productoIndex].stock === 0; // deshabilita el button si no hay stock
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
            const quantity = parseInt(cantidadInput.value, 10);
            const productoId = parseInt(productoElement.dataset.id, 10);

            if (isNaN(quantity) || quantity <= 0) return; //controla la cantidad del input que no debe ser menor a 0

            const productos = JSON.parse(localStorage.getItem('productos'));
            const producto = productos.find(p => p.id === productoId);
            if (!producto) return;

            if (quantity > producto.stock) {
                alert(`No hay suficiente stock para ${producto.nombre}. Stock disponible: ${producto.stock}`);
                return;
            }

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItemIndex = cart.findIndex(item => item.id === productoId);

            if (existingItemIndex >= 0) {
                cart[existingItemIndex].quantity += quantity;
            } else {
                cart.push({ id: productoId, quantity });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            updateProductStock(productoId, quantity);
        });
    });

    updateCartCount();
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const consulta = document.getElementById('consulta').value;

    const data = `Nombre: ${nombre}\nApellido: ${apellido}\nEmail: ${email}\nTeléfono: ${telefono}\nConsulta: ${consulta}\n\n`;

    saveDataToFile(data, 'contacto.txt');
});

function saveDataToFile(data, filename) {
    const blob = new Blob([data], { type: 'text/plain' });
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();

    URL.revokeObjectURL(link.href);
}
