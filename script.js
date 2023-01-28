//1. variables globales
let total = 0
let descuento = 0
let detalle_compra = ``
let registrado = false
let usuario1 = NaN
//array de objetos para los productos en carro
const producto_en_carro_numero = []
const producto_en_carro_cantidad = []

//1.1 Lista para los detalles del producto con formato: [str: producto, float: precio]
let pyv = [[`Disfraz total random`,15],
            ['Disfraz de videojuego',23],
            ['Disfraz de super héroe o villano',22],
            ['Disfraz estilo la purga',19],
            ['Disfraz de animal',18],
            ['Disfraz de un oficio',17],
            ['Disfraz de anime',13],
            ['Disfraz de animales acuaticos',27],
            ['Disfraz de objetos',19],
            ['Disfraz de dinosaurio',33]]


function filter_productos(lista){
    let a,b
    a=lista[0]
    b=lista[1]
    return b<20
}   
//Filtro para solo mostrar productos con precio menor a 20 dolares.
pyv = pyv.filter(filter_productos)


//1.3 texto menú bienvenida separado para mejor visualización y apreciación del código
let text_bienvenida = `Bienvenido a nuestra tienda online de disfraces "Random Halloween".
*No sabes que disfraz usar, atrévete y compra un disfraz aleatorio y se parte de la tendencia.
*Solo por hoy 25% en el total de tu compra por sobre $100.0
 
Selecciona un producto:
${print_detalles()}

Escribe 'REGISTRAR' para registrarte como usuario.
`


function print_detalles(){
    let i = 1
    let descripcion = ``
    pyv.forEach(element => {
        descripcion += `
        ${i}. ${element[0]} ($${element[1]})`
        i+=1
    });

    return descripcion
}
    
function almacenar_detalles_compra(numero_producto,cantidad){

    let idx = producto_en_carro_numero.indexOf(numero_producto)

    if(idx==-1){
        producto_en_carro_numero.push(numero_producto)
        producto_en_carro_cantidad.push(cantidad)
    }else{
        producto_en_carro_cantidad[idx] += cantidad
    }
    
}

function detalle_compra_function(){
    
    detalle_compra = ``
    total = 0
    descuento=0
    for(let i=0; i< producto_en_carro_numero.length; i++){
        let n_prod = producto_en_carro_numero[i]
        let cantidad_producto = producto_en_carro_cantidad[i]
        //resumen_compra(numero_producto,cantidad_producto)
        
        detalle_compra += `+ $${pyv[n_prod][1]*cantidad_producto} | ${pyv[n_prod][0]} ($${pyv[n_prod][1]}) x ${cantidad_producto} unidades
    ` 
        console.log(detalle_compra)
        total += pyv[n_prod][1]*cantidad_producto
    }
    
    if (total >100){
        descuento = 0.25
    }

}

function menu_producto(numero_producto){
    let prod, val
    [prod,val] = pyv[numero_producto]

    let cantidad_producto = NaN
    while(isNaN(cantidad_producto) || cantidad_producto<0){
        cantidad_producto = parseInt(prompt(`¿Cuantos unidades de '${prod}' a $${val} quieres llevar?`))
    }

    //guardar producto y cantidad de compra.
    almacenar_detalles_compra(numero_producto,cantidad_producto)
    detalle_compra_function()

    
        
    let opcion = 0
    while(opcion!=1 && opcion!=2){
         opcion = prompt(`CARRO DE COMPRAS

    ${detalle_compra}
    Total: $${total}
    Descuento ${descuento*100}%: $${total*descuento}
    Total a pagar: $${total-total*descuento}

    Opciones:
    1. Pagar.
    2. Seguir añadiendo al carro`)
    }

    if (opcion==1){
        if(registrado==false){
            registro()
        }
        alert(`Muchas gracias ${usuario1.nombre} por tu compra
        
        Tu pedido llegara entre 3 a 5 días hábiles a la dirección: ${usuario1.direccion}, si existe la necesidad de contactarte lo haremos al numero ${usuario1.celular}
        
        Número de seguimiento: 03330204431 en www.enviosreinmediatos.com/seguimiento/0302`)
    }else{
    menu_bienvenida()}


}

class Usuario{
    constructor(nombre,direccion,celular){
        this.nombre = nombre;
        this.direccion = direccion;
        this.celular = celular;
    }
}



function registro(){
    if(registrado == false){
        registrado = true
        nombre=prompt('Ingrese nombre de usuario')
        direccion=prompt('Ingrese dirección')
        celular=prompt('Ingrese su numero de celular')
        usuario1 = new Usuario(nombre,direccion,celular)
    }else{
        alert('Error al ingresar el usuario. Ya existe un usuario registrado')
    }  
}

function menu_bienvenida(){

    let np = 0 //numero del producto o 'REGISTRAR'
    while(np!=1 && np!=2 && np!=3 && np!=4 && np!=5 && np!=6 && np!='REGISTRAR'){
        np = prompt(text_bienvenida)
    }
    if(np=='REGISTRAR'){
        registro()
        menu_bienvenida()
    }
    
    menu_producto(np-1)
}

function main(){
    menu_bienvenida()  
}
        
main()