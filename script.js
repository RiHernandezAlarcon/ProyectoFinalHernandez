//1. variables globales
let total = 0
let descuento = 0
let detalle_compra = ``

//1.1 detalles de los productos
let p1 = `Disfraz total random`
let p2 = 'Disfraz de videojuego'
let p3 = 'Disfraz de super héroe o villano'
let p4 = 'Disfraz estilo la purga'
let p5 = 'Disfraz de animal'
let p6 = 'Disfraz de un oficio'

//1.2 precios de los productos en dólares
let p1_v = 15
let p2_v = 23
let p3_v = 22
let p4_v = 19
let p5_v = 18
let p6_v = 17

//1.3 texto menú bienvenida separado para mejor visualización y apreciación del código
let text_bienvenida = `Bienvenido a nuestra tienda online de disfraces "Random Halloween".
*No sabes que disfraz usar, atrévete y compra un disfraz aleatorio y se parte de la tendencia.
*Solo por hoy 25% en el total de tu compra por sobre $100.0
 
Selecciona un producto:
1. ${p1} ($${p1_v})
2. ${p2} ($${p2_v})
3. ${p3} ($${p3_v})
4. ${p4} ($${p4_v})
5. ${p5} ($${p5_v})
6. ${p6} ($${p6_v})
`

//función para retornar el nombre de un producto
function return_prod(numero_producto){
    switch(numero_producto){
        case '1':
            return p1
        case '2':
            return p2
        case '3':
            return p3
        case '4':
            return p4
        case '5':
            return p5
        case '6':
            return p6
        default:
            return p6 //temporal
    }
}

//función para retornar el valor de un producto
function return_val(numero_producto){
    switch(numero_producto){
        case '1':
            return p1_v
        case '2':
            return p2_v
        case '3':
            return p3_v
        case '4':
            return p4_v
        case '5':
            return p5_v
        case '6':
            return p6_v
        default:
            return p1_v 
    }
}


function resumen_compra(numero_producto,cantidad){
    switch(numero_producto){
        case '1':
            detalle_compra += `+ ${p1_v*cantidad}: ${p1} ($${p1_v}) x ${cantidad} unidades 
            `
        break;
        case '2':
            detalle_compra += `+ ${p2_v*cantidad}: ${p2} ($${p2_v}) x ${cantidad} unidades 
            `
        break;
        case '3':
            detalle_compra += `+ ${p3_v*cantidad}: ${p3} ($${p3_v}) x ${cantidad} unidades 
            `
        break;
            
        case '4':
            detalle_compra += `+ ${p4_v*cantidad}: ${p4} ($${p4_v}) x ${cantidad} unidades 
            `
        break;
           
        case '5':
            detalle_compra += `+ ${p5_v*cantidad}: ${p5} ($${p5_v}) x ${cantidad} unidades 
            `
        break;
            
        case '6':
            detalle_compra += `+ ${p6_v*cantidad}: ${p6} ($${p6_v}) x ${cantidad} unidades 
            `
        break;
    }
}

function menu_producto(numero_producto){
    let prod, val
    prod = return_prod(numero_producto)
    val = return_val(numero_producto)

    let cantidad_producto = NaN
    while(isNaN(cantidad_producto) || cantidad_producto<0){
        cantidad_producto = parseInt(prompt(`¿Cuantos unidades: ${prod} de $${val} quieres llevar?`))
    }
    //alert("Producto se ha añadido al carro de compras")

    //resumen_compra(numero_producto,cantidad_producto)
    detalle_compra += `+ $${val*cantidad_producto} | ${prod} ($${val}) x ${cantidad_producto} unidades
    ` 
    total += val*cantidad_producto
    // ${prod} ($${val}) x ${cantidad_producto} unidades
    // Total a pagar: $${cantidad_producto*val}.
    if (total >100){
        descuento = 0.25
    }
        
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
        alert('Muchas gracias por tu compra')
    }else{
    menu_bienvenida()}


}

function menu_bienvenida(){

    let np = 0 //numero del producto
    while(np!=1 && np!=2 && np!=3 && np!=4 && np!=5 && np!=6){
        np = prompt(text_bienvenida)
    }
    menu_producto(np)
}

function main(){
    menu_bienvenida()  
}
        
main()