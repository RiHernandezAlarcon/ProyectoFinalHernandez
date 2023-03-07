let pedales_en_carro = JSON.parse(localStorage.getItem("pedales_en_carro")) || []
let lista_pedales = JSON.parse(localStorage.getItem("lista_pedales")) || []


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
    cantidad = []
    ids=[]
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
    console.log("pedales_en_resumen")
    console.log(pedales_resumen)
}

pedales_to_pedales_resumen()

let total_value
let selected_values = []
let total_txt = document.getElementById("total_pagar")

function mostrar_carro(){
    total_value = 0
    productos_carro.innerHTML = ``
    console.log("pedales resumen en mostrar carro()")
    console.log(pedales_resumen)
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
        resumen_to_pedales_en_carro()
   })
    mostrar_carro()
    activate_eliminar_pedal()
}



let btn_eliminate_list
function activate_eliminar_pedal(){
    btn_eliminate_list = Array.from(document.getElementsByClassName("btn_eliminate"))
    console.log("buttons")
    console.log(btn_eliminate_list)
    btn_eliminate_list.forEach(btn => {
    btn.onclick = function(){
        let id_pedal = parseInt(btn.id.split('btn_elim_')[1])
        let pedales_a_conservar = pedales_en_carro.filter(pedal => pedal.id != id_pedal);
        console.log(pedales_a_conservar)
        pedales_en_carro = pedales_a_conservar
        localStorage.setItem("pedales_en_carro", JSON.stringify(pedales_en_carro))
        pedales_to_pedales_resumen()
        mostrar_carro()
        activate_eliminar_pedal()
    }})
}
activate_eliminar_pedal()



let btn_pagar = document.getElementById("btn_pagar")
let div_txt = document.getElementById("div_txt_carro")
let main_carro = document.getElementById("main_carro")

btn_pagar.onclick = function(){
    console.log(pedales_en_carro)
    if (pedales_en_carro.length==0){
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Tu carro esta vacío',
            
          })
    }else{
        Swal.fire({
            title: 'Estas a punto de realizar la compra',
            text: "Estas segur@?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Comprar!',
            cancelButtonText: 'Cancelar'

          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Compra realizada',
                'Tu pedido llegara en 2 días',
                'success'
              )
                div_txt.innerHTML = `<h1>Muchas gracias por tu preferencia</h1>`
                main_carro.innerHTML = ``
                localStorage.clear()
            }
          })

        
    }
    


}
