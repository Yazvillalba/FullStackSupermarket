document.addEventListener('DOMContentLoaded', function() {
    const productos = [
        { nombre: "Producto 1", precio: 10.00, img: "img/producto1.webp" },
        { nombre: "Producto 2", precio: 20.00, img: "img/producto2.webp" },
        { nombre: "Producto 3", precio: 15.00, img: "img/producto3.webp" },
        { nombre: "Producto 4", precio: 25.00, img: "img/producto1.webp" },
        { nombre: "Producto 5", precio: 30.00, img: "img/producto2.webp" },
        { nombre: "Producto 6", precio: 35.00, img: "img/producto3.webp" }
    ];

    const productosContainer = document.querySelector('.productos-container');
    
    const itemsPerSlide = 6;
    const numberOfSlides = Math.ceil(productos.length / itemsPerSlide);

    for (let i = 0; i < numberOfSlides; i++) {
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item${i === 0 ? ' active' : ''}`;
        const productoWrapper = document.createElement('div');
        productoWrapper.className = 'd-flex w-100';

        for (let j = 0; j < itemsPerSlide; j++) {
            const index = i * itemsPerSlide + j;
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
                            <button class="btn btn-light like-button"><span>&#9829;</span></button>
                            <input type="number" class="cantidad-input" value="1" min="1">
                            <button class="btn btn-primary agregar-button">Agregar</button>
                        </div>
                    </div>
                `;

                productoWrapper.appendChild(productoElement);
            }
        }

        carouselItem.appendChild(productoWrapper);
        productosContainer.appendChild(carouselItem);
    }

    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('liked');
        });
    });
});
