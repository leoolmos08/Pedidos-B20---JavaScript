const divBurger = document.querySelector('#divBurgers')
let pedidoParcial = []
let pedidoCompleto = []

const modalPedido = document.querySelector('#modalPedi2')
const modalBurger = document.querySelector('.modalBurger')
const cardToppings = document.querySelector('#cardToppings')
const cardAderezos =  document.querySelector('#cardAderezos')
const cardExtras = document.getElementById("cardExtras")
const enviarCocina = document.getElementById("enviarCocina")

const radioCarne = document.getElementById("flexRadioDefault1")
const radioVeggie = document.getElementById("flexRadioDefault2")
const agregarToppings = document.getElementById("agregarToppings")
const btnConfirmarBurger = document.getElementById("confirmarBurger")

const detalleBurger = document.getElementById("detalleBurger")
const btnVerBurger = document.getElementById("btnVerBurger")
const btnCancelarBurger = document.getElementById("btnCancelarBurger")
const btnMostrarPedido = document.getElementById("btnMostrarPedido")

//BURGERS

fetch('js/burgers.json')
    .then(response => response.json())
    .then(data =>{
    for(burger of data){
        const {id, nombre, desc, img, value} = burger
        let div = document.createElement('div')
        div.innerHTML +=`
        <div class="card mb-3 flex">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${img}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${nombre}</h5>
                        <p class="card-text">${desc}</p>
                        <button type="button" class="btn btn-outline-primary" id="btnBurger${id}" value="${value}" data-bs-toggle="modal" data-bs-target="#modalTipo">Agregar al pedido</button>
                    </div>
                </div>
            </div>
        </div>
        `
        divBurger.appendChild(div)
        const btnAgregarBurger = document.getElementById(`btnBurger${id}`)
        btnAgregarBurger.addEventListener('click',()=>{
            pedidoParcial.push(btnAgregarBurger.value)
        })
    }
});

//BOTON AGREGAR TOPPINGS

agregarToppings.addEventListener('click', ()=>{
    if(radioCarne.checked){
        pedidoParcial.push("Carne")
    }else{
        pedidoParcial.push("Veggie")
    }
})

//FUNCION CONFIRMAR BURGER 
function confirmarBurger(){
    pedidoCompleto.push(pedidoParcial)
    localStorage.setItem('pedido', JSON.stringify(pedidoCompleto));
    pedidoParcial=[];
    Swal.fire(
        '¡Genial!',
        '¡Tu Burger20 fue agregada correctamente!',
        'success'
      )
      setTimeout(function(){
        location.reload();
    }, 1000); 
}

// BOTON VER BURGER

btnVerBurger.addEventListener('click',()=>{
        pedidoParcial.forEach(item => {
            let ul = document.createElement('ul')
            ul.innerHTML = `
            <li>${item}</li>
            `
            detalleBurger.appendChild(ul)
        })
})

//BOTON CONFIMAR BURGER

btnConfirmarBurger.addEventListener('click', ()=>{
    confirmarBurger();
})

//BOTON CANCELAR BURGER 

btnCancelarBurger.addEventListener('click', ()=>{
    pedidoParcial=[];
    location.reload();
})

//BOTON MOSTRAR PEDIDO 

btnMostrarPedido.addEventListener('click',()=>{
    let contModal = -1 
        modalPedido.innerHTML =``
        pedidoCompleto.forEach(item => {
            let div = document.createElement('div');
            contador++
            contModal++
            localStorage.setItem('contador', JSON.stringify(contador))
            div.innerHTML +=`
            <div class="card text-center" style="width: 11rem;">
                <div class="card-header">
                <h5>Pedido #${contador}</h5>
                </div>
                <div class="card-body">
                <p class="card-text">${item.join(' - ')}</p>
                <a href="#" class="btn btn-secondary" id="btnEliminar${contador}" value="${contModal}">Eliminar</a>
                </div>
            </div>
            `
            modalPedido.appendChild(div)
            let btnEliminar = document.getElementById(`btnEliminar${contador}`)
            btnEliminar.addEventListener('click', ()=>{
                console.log(btnEliminar.value);
            })
        });
    }
)

//TOPPINGS
fetch('js/toppings.json')
    .then(response => response.json())
    .then(top=>{
        for (const topping of top){
            const {id , nombre} = topping;
            let div = document.createElement('div')
            div.innerHTML +=`
            <p>${nombre}<input type="checkbox" id="toppingCheck${id}" value="${nombre}"><br></p>
            `
            cardToppings.appendChild(div)
            let checkbox = document.getElementById(`toppingCheck${id}`);
            checkbox.addEventListener('click', function() {
                if(checkbox.checked) {
                pedidoParcial.push(checkbox.value);
                Toastify({
                    text: "✔ Topping agregado",
                    className: "info",
                    duration: 1000,
                    style: {
                    background: "linear-gradient(to right, #51FA08, #49DE09)",
                    }
                }).showToast();
                } else { 
                    pedidoParcial = pedidoParcial.filter( item => !item.includes(checkbox.value));
                    Toastify({
                        text: "❌ Topping eliminado",
                        className: "info",
                        duration: 1000,
                        style: {
                        background: "linear-gradient(to right, #FF2311, #FE3525)",
                        }
                    }).showToast();
                }
            })
        }
    })
    .catch(error => console.log(error))


//ADEREZOS

fetch('js/aderezos.json')
    .then(response => response.json())
    .then(i=>{
        for (const topping of i){
            let div = document.createElement('div')
            const {id , nombre} = topping;
            div.innerHTML +=`
                    <p>${nombre}<input type="checkbox" id="toppingCheck${id}" value="${nombre}"></p>
            `
            cardAderezos.appendChild(div)
            let checkbox = document.getElementById(`toppingCheck${id}`);
            checkbox.addEventListener('click', function() {
                if(checkbox.checked) {
                pedidoParcial.push(checkbox.value);
                Toastify({
                    text: "✔ Topping agregado",
                    className: "info",
                    duration: 1000,
                    style: {
                    background: "linear-gradient(to right, #51FA08, #49DE09)",
                    }
                }).showToast();
                } else { 
                    pedidoParcial = pedidoParcial.filter( item => !item.includes(checkbox.value));
                    Toastify({
                        text: "❌ Topping eliminado",
                        className: "info",
                        duration: 1000,
                        style: {
                        background: "linear-gradient(to right, #FF2311, #FE3525)",
                        }
                    }).showToast();
                }
            })
        }
    })
    .catch(error => console.log(error))

//EXTRAS

fetch('js/extras.json')
.then(response=>response.json())
.then(data=>{
    for(extras of data){
        let div = document.createElement('div')
        const {id, nombre, value} = extras
        div.innerHTML=`
        <p>${nombre}<input type="checkbox" id="extraCheck${id}" value="${value}"><br></p>
        `
        cardExtras.appendChild(div)

        let checkbox = document.getElementById(`extraCheck${id}`);
            checkbox.addEventListener('click', function() {
                if(checkbox.checked) {
                pedidoParcial.push(checkbox.value);
                Toastify({
                    text: "✔ Extra agregado",
                    className: "info",
                    duration: 1000,
                    style: {
                    background: "linear-gradient(to right, #51FA08, #49DE09)",
                    }
                }).showToast();
                } else { 
                    pedidoParcial = pedidoParcial.filter( item => !item.includes(checkbox.value));
                    Toastify({
                        text: "❌ Extra eliminado",
                        className: "info",
                        duration: 1000,
                        style: {
                        background: "linear-gradient(to right, #FF2311, #FE3525)",
                        }
                    }).showToast();
                }
            })
    }
})

//CONTADOR

let contador = 0
function recuperarContador() {
    let contadorLS = JSON.parse(localStorage.getItem('contador'))
    contadorLS ? contador = contadorLS : contador = 0;
}
recuperarContador()

//FUNCION RECUPERAR 

function recuperar() {
    let recuperarLS = JSON.parse(localStorage.getItem('pedido'))
    recuperarLS ? pedidoCompleto = recuperarLS : pedidoCompleto=[];
}

recuperar()

//imprimir o enviar a cocina

enviarCocina.addEventListener('click',
    function imprim1(pedidoCompleto){
        localStorage.removeItem('pedido');
        setTimeout(function(){
            location.reload();
        }, 1500)
        let printContents = document.querySelector('.pedidoCompleto').innerHTML;
            w = window.open();
            w.document.write(printContents);
            w.document.close();
            w.focus();
            w.print();
            w.close();
            return true;
            
    
})
