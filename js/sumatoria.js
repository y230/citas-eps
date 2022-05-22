const url = 'http://localhost:3000/api/sum/'
const contenedor = document.querySelector('tbody')
let resultados = ''




//funcion para mostrar los resultados
const mostrar = (reservacion) => {
    reservacion.forEach(reservaciones => {
        resultados += `<tr>
                            
                            <td>${reservaciones.total}</td>
                           
                       </tr>`    
    })
    contenedor.innerHTML = resultados
   
}
//Procedimiento Mostrar
fetch(url)
    .then( response => response.json() )
    .then( data => mostrar(data) )
    .catch( error => console.log(error))
 
const on = (element, event, selector, handler) => {
    //console.log(element)
    //console.log(event)
    //console.log(selector)
    //console.log(handler)
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}