import './style.css'

const products = [
  {
    name: 'Inserto Ark Nova',
    price: 19.99,
    stars: 3,
    reviews: 250,
    seller: 'Maldito Games',
    image: 'img/ark_nova_inserto.jpg',
    href: "https://jugamosuna.es/tienda/27175/comprar-actualizacion-inserto-compatible-con-las-ruinas-perdidas-de-ark-nova-barato.html"
  },{
    name: 'New York City',
    price: 84.99,
    stars: 4,
    reviews: 300,
    seller: 'Queen Games',
    image: 'img/new_york_city.png',
    href: "https://jugamosuna.es/tienda/26847/comprar-new-york-city-classic-ende-barato.html"
  },{
    name: 'Marrakesh',
    price: 69.99,
    stars: 5,
    reviews: 280,
    seller: 'Queen Games',
    image: 'img/marrakesh.png',
    href: "https://jugamosuna.es/tienda/26845/comprar-marrakesh-essential-inglesbarato.html"
  },{
    name: 'Future Energy',
    price: 44.99,
    stars: 4,
    reviews: 150,
    seller: 'Queen Games',
    image: 'img/future_energy.jpg',
    href: "https://jugamosuna.es/tienda/26835/comprar-future-energy-en-de-barato.html"
  },{
    name: 'Escape Roll & Write',
    price: 21.99,
    stars: 4,
    reviews: 350,
    seller: 'Queen Games',
    image: 'img/escape.jpg',
    href: "https://jugamosuna.es/tienda/26834/comprar-escape-roll-write-en-de-barato.html"
  },{
    name: 'The Red Palace',
    price: 54.99,
    stars: 5,
    reviews: 250,
    seller: 'Queen Games',
    image: 'img/red_palace.png',
    href: "https://jugamosuna.es/tienda/26544/comprar-alhambra-the-red-palace-ingles-barato.html"
  },{
    name: 'Alhambra',
    price: 44.99,
    stars: 4,
    reviews: 257,
    seller: 'Queen Games',
    image: 'img/alhambra.png',
    href: "https://jugamosuna.es/tienda/26542/comprar-alhambra-en-de-fr-barato.html"
  },{
    name: 'Comet',
    price: 34.99,
    stars: 3,
    reviews: 170,
    seller: 'Funtails',
    image: 'img/comet.png',
    href: "https://jugamosuna.es/tienda/26541/comprar-comet-ingles-barato.html"
  },{
    name: 'Lata',
    price: 14.99,
    stars: 4,
    reviews: 450,
    seller: 'Pytagoras',
    image: 'img/lata.jpg',
    href: "https://jugamosuna.es/tienda/26508/comprar-lata-barato.html"
  },{
    name: 'Dice Theme Park',
    price: 44.99,
    stars: 5,
    reviews: 214,
    seller: 'Maldito Games',
    image: 'img/dice_theme.jpg',
    href: "https://jugamosuna.es/tienda/26504/comprar-dice-theme-park-barato.html"
  }
];

// Obtener la referencia a la sección de productos
const productosSection = document.getElementById('productos');
const list = document.createElement('ul');
productosSection.appendChild(list);

// Iterar sobre el array de productos
products.forEach(product => {
    // Crear un elemento de lista
    const listItem = document.createElement('li');
    listItem.id = product.name;

    // Crear la imagen del producto
    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.name;

    // Crear el título del producto con enlace
    const productTitle = document.createElement('h3');
    const productLink = document.createElement('a');
    productLink.href = product.href;
    productLink.rel = 'noopener';
    productLink.textContent = product.name;
    productTitle.appendChild(productLink);

    // Crear el párrafo del precio del producto
    const productPrice = document.createElement('p');
    productPrice.textContent = `${product.price}€`;

    // Agregar la imagen, título y precio al elemento de lista
    listItem.appendChild(productImage);
    listItem.appendChild(productTitle);
    listItem.appendChild(productPrice);

    // Agregar el elemento de lista a la sección de productos
    list.appendChild(listItem);
});

const filtroVendedor = document.getElementById('filtro-vendedor');
const filtroPrecio = document.getElementById('filtro-precio');
const btnBuscarPrecio = document.getElementById('buscar-precio');
const btnLimpiarFiltros = document.getElementById('limpiar-filtros');
const listaProductos = document.getElementById('productos').getElementsByTagName('li');

// Obtener vendedores distintos
const vendedores = Array.from(products.reduce((set, product) => set.add(product.seller), new Set()));

// Agregar opciones de vendedor al select
vendedores.forEach(vendedor => {
    const option = document.createElement('option');
    option.value = vendedor;
    option.textContent = vendedor;
    filtroVendedor.appendChild(option);
});

// Función para aplicar filtros
function aplicarFiltros() {
    const vendedorSeleccionado = filtroVendedor.value;
    const precioMaximo = parseFloat(filtroPrecio.value) || Infinity;
    let algunProductoVisible = false;

    Array.from(products).forEach(producto => {
        const seller = producto.seller;
        const price = producto.price;

        const mostrarPorVendedor = vendedorSeleccionado === 'todos' || vendedorSeleccionado === seller;
        const mostrarPorPrecio = price <= precioMaximo;

        if (mostrarPorVendedor && mostrarPorPrecio) {
          document.getElementById(producto.name).style.display = 'block';
          algunProductoVisible = true;
      } else {
        document.getElementById(producto.name).style.display = 'none';
      }
    });

    const mensajeProductosVacios = document.getElementById('vacio');
    if (!algunProductoVisible) {
        mensajeProductosVacios.style.display = 'block';
    } else {
        mensajeProductosVacios.style.display = 'none';
    }
}

// Evento para aplicar filtro al cambiar vendedor seleccionado
filtroVendedor.addEventListener('change', aplicarFiltros);

// Evento para aplicar filtro al hacer clic en el botón buscar
btnBuscarPrecio.addEventListener('click', aplicarFiltros);

// Evento para limpiar los filtros
btnLimpiarFiltros.addEventListener('click', () => {
    filtroVendedor.value = 'todos';
    filtroPrecio.value = '';
    Array.from(listaProductos).forEach(producto => producto.style.display = 'block');
});

