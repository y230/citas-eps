const url = 'http://localhost:3000/api/nombres_asc/'
const contenedor = document.querySelector('tbody')
let resultados = ''




//funcion para mostrar los resultados
const mostrar = (pacientes) => {
    pacientes.forEach(paciente => {
        resultados += `<tr>
                            <td>${paciente.id_paciente}</td>
                            <td>${paciente.nombres}</td>
                            <td>${paciente.apellidos}</td>
                            <td>${paciente.edad}</td>
                            <td>${paciente.telefono}</td>
                            <td>${paciente.direccion}</td>
                            <td>${paciente.fecha_registro}</td>
                            <td>${paciente.estado}</td>
                           
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