let pedales_en_carro = JSON.parse(localStorage.getItem("pedales_en_carro")) || []

class Pedal{
    constructor(id,nombre,marca,precio,img){
        this.id = id;
        this.nombre = nombre;
        this.marca = marca;
        this.precio = precio;
        this.img = img;
    }
}

let lista_pedales = []
function read_pedales(){
    const pedal0 = new Pedal(0,"Tube Screamer","IBANEZ",parseInt(96000/valor_dolar),"img/ibanez tube screamer.jpg")
    const pedal1 = new Pedal(1,"Vintage Overdrive","JOYO",parseInt(42000/valor_dolar),"img/Joyo-Vintage.jfif")
    const pedal2 = new Pedal(2,"Vintage Phase","JOYO",parseInt(46000/valor_dolar),"img/JoyoVintagePhase.avif")
    const pedal3 = new Pedal(3,"Analog Chorus","JOYO",parseInt(40000/valor_dolar),"img/Joyo-Analog Chorus.webp")
    const pedal4 = new Pedal(4,"Analog Delay","JOYO",parseInt(48000/valor_dolar),"img/Joyo-Analog Delay.jpg")
    const pedal5 = new Pedal(5,"The Big Orange","CALINE",parseInt(52000/valor_dolar),"img/Caline The big orange.jpg")
    const pedal6 = new Pedal(6,"Snake Bite","CALINE",parseInt(58000/valor_dolar),"img/Caline Snake bite.webp")
    const pedal7 = new Pedal(7,"Super Overdrive","BOSS",parseInt(72000/valor_dolar),"img/boss overdrive.png")
    const pedal8 = new Pedal(8,"Distortion DS-1","BOSS",parseInt(66000/valor_dolar),"img/boss turbo distorsion.jpg")
    
    const pedal9 = new Pedal(9,"Big Muff","EH",parseInt(90000/valor_dolar),"img/EH Bigmuff.jpg")
    const pedal10 = new Pedal(10,"Nano Looper","EH",parseInt(86000/valor_dolar),"img/EH looper.webp")
    const pedal11 = new Pedal(11,"Nano Clone","EH",parseInt(70000/valor_dolar),"img/EH nano.jpg")
    
    const pedal12 = new Pedal(12,"Mini Chorus","IBANEZ",parseInt(78000/valor_dolar),"img/ibanez mini chorus.jpg")
    const pedal13 = new Pedal(13,"Mini Tremolo","IBANEZ",parseInt(74000/valor_dolar),"img/ibanez mini tremolo.jpg")
    
    lista_pedales.push(pedal0,pedal1,pedal2,pedal3,pedal4,pedal5,pedal6,pedal7,pedal8,pedal9,pedal10,pedal11,pedal12,pedal13)
    localStorage.setItem("lista_pedales", JSON.stringify(lista_pedales))
}


let productos = document.getElementById("div_productos")

function cargar_pedales(){
    productos.innerHTML = ``
    lista_pedales.forEach(pedal => {
        productos.innerHTML += 
        `<div class="card_producto">
            <img class="pedal_img" src="${pedal.img}" alt="">
            <p class="pedal_name txt">${pedal.nombre}</p>
            <p class="pedal_marca txt">${pedal.marca}</p>
            <p class="pedal_precio txt">$${pedal.precio}</p>
            <button id="btn_pedal_${pedal.id}" class="btn_pedal btn btn-outline-secondary" href="#" role="button" value="${pedal.id}">Añadir al carro</button>
        </div>`
    })  
    get_buttons_agregar_c()
}

function filtro_precio(li,ls){
    productos.innerHTML = ``
    lista_pedales.forEach(pedal => {
        if(pedal.precio>=li && pedal.precio<=ls){
            productos.innerHTML += 
        `<div class="card_producto">
            <img class="pedal_img" src="${pedal.img}" alt="">
            <p class="pedal_name txt">${pedal.nombre}</p>
            <p class="pedal_marca txt">${pedal.marca}</p>
            <p class="pedal_precio txt">$${pedal.precio}</p>
            <button id="btn_pedal_${pedal.id}" class="btn_pedal btn btn-outline-secondary" href="#" role="button" value="${pedal.id}">Añadir al carro</button>
        </div>`
        }
    })    
    get_buttons_agregar_c()
}


// funcion para agregar objeto al carro
function agregar_pedal(pedal){
    pedales_en_carro.push(pedal)
    localStorage.setItem("pedales_en_carro", JSON.stringify(pedales_en_carro))
}

let btn_to_carro = []
function get_buttons_agregar_c(){
    btn_to_carro = document.querySelectorAll(".btn_pedal")
}

function activate_events_button(){
    btn_to_carro.forEach(btn => {
        btn.onclick = function(){
            agregar_pedal(lista_pedales[btn.value])
            Toastify({
                text: "Pedal añadido al carro",
                className: "info",
                stopOnFocus: false,
                duration: 1000
                }).showToast();
                
        }
    }) 
}
 

let rb_list = document.querySelectorAll(".rb")

function activate_filtro_precio(){
    for (const [index, button] of rb_list.entries()) {
          if(button.checked==true){
              switch(index){
                  case 0:
                    cargar_pedales()
                    break
                  case 1:
                    filtro_precio(0,60)  
                    break
                  case 2:
                    filtro_precio(60,90)  
                    break
                  case 3:
                    filtro_precio(90,999999)
                    break
              }    
          }
    }
    activate_events_button()
}


rb_list[0].onclick= function(){
    rb_list[0].cheked = true
    activate_filtro_precio()
}

rb_list[1].onclick= function(){
    rb_list[1].cheked = true
    activate_filtro_precio()
}

rb_list[2].onclick= function(){
    rb_list[2].cheked = true
    activate_filtro_precio()
}
rb_list[3].onclick= function(){
    rb_list[3].cheked = true
    activate_filtro_precio()
}

// activate_filtro_precio()

//consumo API del valor del dolar en pesos chilenos
let valor_dolar
fetch('https://mindicador.cl/api')
    .then((response)=> response.json())
    .then((json)=> {
        valor_dolar=json.dolar.valor
        read_pedales()
        activate_filtro_precio()}
    )
