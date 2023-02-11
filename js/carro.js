let pedales_en_carro = []

if(localStorage.getItem("pedales_en_carro")){
    pedales_en_carro = JSON.parse(localStorage.getItem("pedales_en_carro"))
}

let productos_carro = document.getElementById("cards_in_carro")



let ids = []
let cantidad = []
let new_pedales_en_carro = []

// guardar ids de los pedales junto con su cantidad
pedales_en_carro.forEach(pedal => {
    if(ids.includes(pedal.id)){
        //esta en ids
        cantidad[ids.indexOf(pedal.id)] +=1
        pedal.cantidad = cantidad[ids.indexOf(pedal.id)]
        new_pedales_en_carro[ids.indexOf(pedal.id)] = pedal
    }else{
        //no esta en ids
        ids.push(pedal.id)
        pedal.cantidad = 1
        new_pedales_en_carro.push(pedal)
        cantidad.push(1)
        
    }
})

console.log(ids)
console.log(cantidad)
console.log(new_pedales_en_carro)


let total_value = 0
productos_carro.innerHTML = ``
new_pedales_en_carro.forEach(pedal => {
    
    productos_carro.innerHTML += 
    ` <div id="card_in_carro">
    <img id="img_card_carro" src="../${pedal.img}" alt="">
    <div id="description_card_carro">
        <p class="txt">${pedal.nombre}</p>
        <p class="txt">${pedal.marca}</p>
        <p class="txt">Stock: Disponible</p>
    </div>
    <p class="precio_card_carro txt">$${pedal.precio}</p>
    <div class="cantidad_card_cerro"> ${pedal.cantidad}</div>
    <p class="subtotal_card_carro txt">$${pedal.precio*pedal.cantidad}</p>
    <p class="X_card txt"> </p>
    </div>`
    total_value+=pedal.precio*pedal.cantidad
})



let total_txt = document.getElementById("total_pagar")
total_txt.innerText = `Total $${total_value}`

let btn_pagar = document.getElementById("btn_pagar")
let div_txt = document.getElementById("div_txt_carro")
let main_carro = document.getElementById("main_carro")

btn_pagar.onclick = function(){
    div_txt.innerHTML = `<h1>Muchas gracias por tu compra</h1>`
    main_carro.innerHTML = ``

    localStorage.clear()
}
