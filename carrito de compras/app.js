let carrito = document.getElementById("elem-carrito");
let productos = document.getElementById("lista-productos");
let listaCarrito = document.getElementById("lista-carrito");
let logoCarrito = document.getElementById("carrito");
let btnVaciar = document.querySelector("#vaciar-carrito");
let total = document.getElementById("total");
let totalAcumulado;
let cambiar = false;

//eventos
//agregar un producto al carrito
productos.addEventListener("click", aggCarrito);
//eliminar producto del carrito
carrito.addEventListener("click", eliminarProducto);
//vaciar carrito
btnVaciar.addEventListener("click", vaciarCarrito);
//Cargar automaticamente los datos del localSt en el carrito
imprimirLs();

//mostrar listado del carrito
logoCarrito.addEventListener("click", () => {
    if (cambiar === false){
        carrito.style.visibility = "visible";
        cambiar= true;
    }
    else{
    carrito.style.visibility= "hidden";
    cambiar= false;}
})

//funciones
//agg producto al carrito
function aggCarrito(e) {
    e.preventDefault();
    //delegation para coger el boton
    if (e.target.classList.contains("agregar-carrito")) {
        let producto = e.target.parentElement;
        //llamamos una funcion para leer datos de producto
        AggProducto(producto);
    }
}
//leer datos de variable producto y agrega al carrito
function AggProducto(producto) {
    let productol = {
        imagen: producto.querySelector("img").src,
        nombre: producto.querySelector("h2").textContent,
        precio: producto.querySelector("h3").textContent
    }

    let borrar = document.createElement("a");
    borrar.textContent = "X";
    borrar.className = "btn-borrar";

    let li = document.createElement("li");
    li.className = "li-cursos";
    li.innerHTML = `<img src="${productol.imagen}" width="100" height="80"> <h4>${productol.nombre}</h4> <h3>${ productol.precio}</h3>`;
    li.appendChild(borrar).value;

    listaCarrito.appendChild(li);


    if ((total.textContent != "")) {
        totalAcumulado += parseInt(productol.precio.substring(1));
        total.textContent = totalAcumulado;
    } else {
        total.textContent = productol.precio.substring(1);
        totalAcumulado = parseInt(total.textContent);
    }


    addLocalStorage(productol);
}

//eliminar producto del carrito
function eliminarProducto(e) {
    e.preventDefault();

    let producto;
    let precioproducto;

    if (e.target.classList.contains("btn-borrar")) {
        e.target.parentElement.remove()

        producto = e.target.parentElement;
        producto = producto.querySelector("h4").textContent;
        precioproducto = e.target.parentElement;
        precioproducto = precioproducto.querySelector("h3").textContent;

        eliminarProdLs(producto);
        console.log(producto);

        totalAcumulado -= parseInt(precioproducto.substring(1))
        total.textContent = totalAcumulado;
    }
}

//vaciar carrito
function vaciarCarrito() {
    while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild)
    }
    localStorage.removeItem("productos");
    total.textContent = "";
}

//agregar datos al local storage
function addLocalStorage(producto) {
    let productos;

    productos = obtenerDatosLs();
    productos.push(producto)
    localStorage.setItem("productos", JSON.stringify(productos))
}

function obtenerDatosLs() {
    let productosLs;

    if (localStorage.getItem("productos") === null) {
        productosLs = new Array();
    } else {
        productosLs = JSON.parse(localStorage.getItem("productos"));
    }

    return productosLs;
}

function imprimirLs() {
    let productols;

    productols = obtenerDatosLs();

    productols.forEach(productol => {
        let borrar = document.createElement("a");
        borrar.textContent = "X";
        borrar.className = "btn-borrar";

        let li = document.createElement("li");
        li.className = "li-cursos";
        li.innerHTML = `<img src="${productol.imagen}" width="100" height="80"> <h4>${productol.nombre}</h4> <h3>${ productol.precio}</h3>`;
        li.appendChild(borrar).value

        listaCarrito.appendChild(li);

    })
}

function eliminarProdLs(producto) {
    let productoLs = obtenerDatosLs();

    productoLs.forEach((prod, index) => {
        if (prod.nombre === producto) {
            productoLs.splice(index, 1)
        }
    })

    localStorage.setItem("productos", JSON.stringify(productoLs))
}