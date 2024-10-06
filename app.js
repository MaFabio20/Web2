class ProductoModelo {
    constructor() {
        this.apiURL = 'https://fakestoreapi.com/products';
    }

   
    async obtenerProductos() {
        try {
            const respuesta = await fetch(this.apiURL);
            const productos = await respuesta.json();
            return productos;
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    }
}
class ProductoVista {
    constructor() {
        this.productosDiv = document.getElementById('productos');
    }

    
    mostrarProductos(productos) {
        this.productosDiv.innerHTML = '';  

        productos.forEach((producto) => {
            const productoHTML = `
            <div class="col-md-4">
                <div class="card mb-4">
                    <img src="${producto.image}" class="card-img-top" alt="${producto.title}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.title}</h5>
                        <p class="card-text">${producto.description}</p>
                        <p class="card-text"><strong>$${producto.price}</strong></p>
                    </div>
                </div>
            </div>`;
            this.productosDiv.innerHTML += productoHTML;
        });
    }
}
class ProductoControlador {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
        this.inicializar();
    }

    async inicializar() {
        const productos = await this.modelo.obtenerProductos();
        this.vista.mostrarProductos(productos);  
    }
}


const app = new ProductoControlador(new ProductoModelo(), new ProductoVista());
