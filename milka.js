document.addEventListener('DOMContentLoaded', function() {
    const productos = [
        { nombre: "Alfajor Milka Mousse", precio: 10.00, img: "img/milka/producto1.webp" },
        { nombre: "Milka Leche", precio: 20.00, img: "img/milka/producto2.webp" },
        { nombre: "Chocopause Oreo", precio: 15.00, img: "img/milka/producto3.webp" },
        { nombre: "Chocopause Leche", precio: 25.00, img: "img/milka/producto4.webp" },
        { nombre: "Chocolate Aireado con Almendras", precio: 30.00, img: "img/milka/producto5.webp" },
        { nombre: "Chocolate Relleno Dulce de Leche", precio: 35.00, img: "img/milka/producto6.webp" },
        { nombre: "Chocolate Castañas con Caramelo", precio: 30.00, img: "img/milka/producto7.webp" },
        { nombre: "Chocolate Relleno Oreo", precio: 30.00, img: "img/milka/producto8.webp" },
    ];

    const productosContainer = document.querySelector('.productos-container');    
    const itemsPorSlider = 4;
    const cantSliders = Math.ceil(productos.length / itemsPorSlider);

    for (let i = 0; i < cantSliders; i++) {
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item${i === 0 ? ' active' : ''}`;
        const productCard = document.createElement('div');
        productCard.className = 'd-flex w-100 ';

        for (let j = 0; j < itemsPorSlider; j++) {
            const index = i * itemsPorSlider + j;
            if (index < productos.length) {
                const producto = productos[index];
                const productoElement = document.createElement('div');
                productoElement.className = 'producto';

                productoElement.innerHTML = `
                    <img src="${producto.img}" alt="${producto.nombre}">
                    <div class="producto-info">
                        <h4>${producto.nombre}</h4>
                        <p class="precio">$${producto.precio.toFixed(2)}</p>
                        <div class="producto-actions">
                            <button class="like-button"><span>&#9829;</span></button>
                            <input type="number" class="cantidad-input" value="1" min="1">
                            <button class="btn btn-dark agregar-button">Agregar</button>
                        </div>
                    </div>
                `;

                productCard.appendChild(productoElement);
            }
        }

        carouselItem.appendChild(productCard);
        productosContainer.appendChild(carouselItem);
    }

    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('liked');
        });
    });
});