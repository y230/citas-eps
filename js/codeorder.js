const url = 'http://localhost:3000/api/asc/'
const contenedor = document.querySelector('tbody')
let resultados = ''




//funcion para mostrar los resultados
const mostrar = (diagnostico) => {
    diagnostico.forEach(diagnosticos => {
        resultados += `<tr>
                            <td>${diagnosticos.id_diagnostico}</td>
                            <td>${diagnosticos.id_reservacion}</td>
                            <td>${diagnosticos.comentarios}</td>
                            <td>${diagnosticos.laboratorio}</td>
                            <td>${diagnosticos.resultado}</td>
                            <td>${diagnosticos.fecha_registro}</td>
                            <td>${diagnosticos.estado}</td>
                           
                       </tr>
                    `    
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