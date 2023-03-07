# ProyectoFinalHernandez
El proyecto consiste en un prototipo de e-commerce de pedales de guitarra.

Este incluye:

Creación de "Objetos" para los pedales de guitarra y "Arrays" de objetos (pedales) para la manipulación de estos. Se utilizó "Métodos de Arrays" y sus "Atributos", como Lenght (para validar que un array está vacío), filter (para crear la funcionalidad de filtrar por distintos rangos de precios), forEach, push etc. 

Se crean múltiples Funciones:
  En script.js asociado a index.html. Para la creación de Arrays de objetos (pedales), para cargar los pedales en el DOM, para filtrar pedales por precio y cargarlos en el DOM.
  En carro.js asociado a carro.html. Para mapear la lista de pedales en carro en una lista de pedales resumida que se muestra en el DOM con la ayuda de la función "mostrar_carro()". Para eliminar los pedales del carro. 
  
Se utiliza principalmente el "Evento" Onclick sobre los botones y selectores en el DOM, para activar distintas funcionalidades, como agregar producto al carro, cambiar las unidades de un producto, eliminar productos y realizar la compra.

La "Sintaxis avanzada" se ocupa para recuperar JSON del Storage tanto en script.js como carro.js.

Se ocupan las "Librerías" Bootstrap para enriquecer los estilos y diseño de las páginas. Toastify, para notificar al usuario cuando agrega un producto al carro y Sweet Alert, para distintos cuadros emergentes asociados al proceso de compra de productos.

Se utiliza "Fetch" para consumir una API, de la cual se obtiene un JSON del dólar. El cual es utilizado para transformar el valor de los pedales en CLP a Dólar. 

