let pedales_en_carro = []

if(localStorage.getItem("pedales_en_carro")){
    pedales_en_carro = JSON.parse(localStorage.getItem("pedales_en_carro"))
}

let lista_pedales = []
if(localStorage.getItem("lista_pedales")){
    lista_pedales = JSON.parse(localStorage.getItem("lista_pedales"))
}
console.log(lista_pedales)
console.log(pedales_en_carro[1])

let productos_carro = document.getElementById("cards_in_carro")

//convertir  a function
let ids = []
let cantidad = []
let pedales_resumen = []

function pedales_to_pedales_resumen(){
    //guardar ids de los pedales junto con su cantidad
    pedales_resumen = []
    pedales_en_carro.forEach(pedal => {
    if(ids.includes(pedal.id)){
        //esta en ids
        cantidad[ids.indexOf(pedal.id)] +=1
        pedal.cantidad = cantidad[ids.indexOf(pedal.id)]
        pedales_resumen
    [ids.indexOf(pedal.id)] = pedal
    }else{
        //no esta en ids
        ids.push(pedal.id)
        pedal.cantidad = 1
        pedales_resumen.push(pedal)
        cantidad.push(1)
    }
    })
}

pedales_to_pedales_resumen()

let total_value
let selected_values = []
let total_txt = document.getElementById("total_pagar")

function mostrar_carro(){
    total_value = 0
    productos_carro.innerHTML = ``
    pedales_resumen.forEach(pedal => {
        productos_carro.innerHTML += 
        ` <div class="card_in_carro" id="card_pedal_${pedal.id}">
        <img id="img_card_carro" src="../${pedal.img}" alt="">
        <div id="description_card_carro">
            <p class="txt">${pedal.nombre}</p>
            <p class="txt">${pedal.marca}</p>
            <p class="txt">Stock: Disponible</p>
        </div>
        <p class="precio_card_carro txt">$${pedal.precio}</p>
        <!--  <div class="cantidad_card_cerro"> ${pedal.cantidad} </div> -->
        <div class="cantidad_card_carro">
            <select id="select_${pedal.id}" class="selectpicker select_in_carro" onchange="refresh_values()">
            <option class="select_option">1</option>
            <option class="select_option">2</option>
            <option class="select_option">3</option>
            <option class="select_option">4</option>
            <option class="select_option">5</option>
            <option class="select_option">6</option>
            <option class="select_option">7</option>
            <option class="select_option">8</option>
            <option class="select_option">9</option>
            <option class="select_option">10</option>
            </select>

        </div>

        <p class="subtotal_card_carro txt">$${pedal.precio*pedal.cantidad}</p>
        <button type="button" class="btn btn-warning btn-circle btn_eliminate" id="btn_elim_${pedal.id}">X</button>
        </div>`
        total_value+=pedal.precio*pedal.cantidad
    })
    total_txt.innerText = `Total $${total_value}`

    console.log(pedales_resumen
    )
    pedales_resumen.forEach(pedal => {
         let selected_value = document.getElementById(`select_${pedal.id}`)
         selected_value.value =pedal.cantidad
    })
}

mostrar_carro()

function resumen_to_pedales_en_carro(){
    let lista_soporte = []
    pedales_resumen.forEach(pedal=> {
        let c = pedal.cantidad
        let id = pedal.id

        for (let step = 0; step < c; step++) {
            lista_soporte.push(lista_pedales[id])
          }
    })
    pedales_en_carro=lista_soporte
    localStorage.setItem("pedales_en_carro", JSON.stringify(pedales_en_carro))
}

function refresh_values(){
    pedales_resumen.forEach(pedal => {
        let selected_value = document.getElementById(`select_${pedal.id}`)
        pedal.cantidad=parseInt(selected_value.value)
        //function para convertir formato con cantidades a lista
        //pedales resumen a pedales_en_carro
        resumen_to_pedales_en_carro()

   })
    mostrar_carro()  
}

let btn_eliminate_list = Array.from(document.getElementsByClassName("btn_eliminate"))
console.log(btn_eliminate_list)

btn_eliminate_list.forEach(btn => {
    btn.onclick = function(){

        console.log(`card_pedal_${btn.id.split('btn_elim_')[1]}`)
        let card_pedal = document.getElementById(`card_pedal_${btn.id.split('btn_elim_')[1]}`)
        //card_pedal.remove(card_pedal)
        
        //busco prod a eliminar
        // let productoEliminar = array.find(libro => libro.id == productoCarrito.id)
        // console.log(productoEliminar)
        // //busco el indice
        // let posicion = array.indexOf(productoEliminar)
        // console.log(posicion)
        // //splice (posicion donde trabajar, cant de elementos a eliminar)
        // array.splice(posicion, 1)
        // console.log(array)
        // //eliminar storage (volver a setear)
        // localStorage.setItem("carrito", JSON.stringify(array))
        // //recalcular total
        // compraTotal(array)
    // })
    }
})



let btn_pagar = document.getElementById("btn_pagar")
let div_txt = document.getElementById("div_txt_carro")
let main_carro = document.getElementById("main_carro")

btn_pagar.onclick = function(){
    div_txt.innerHTML = `<h1>Muchas gracias por tu compra</h1>`
    main_carro.innerHTML = ``

    localStorage.clear()
}
