//Definición de variables
const url = 'http://localhost:3000/api/diagnostico/'
const contenedor = document.querySelector('tbody')
let resultados = ''

const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'))
const formArticulo = document.querySelector('form')
const id_reservacion = document.getElementById('id_reservacion')
const comentarios= document.getElementById('comentarios')
const laboratorio = document.getElementById('laboratorio')
const resultado = document.getElementById('resultado')
const fecha_registro = document.getElementById('fecha_registro')
const estado = document.getElementById('estado')

var opcion = ''

btnCrear.addEventListener('click', ()=>{
    id_reservacion.value = ''
    comentarios.value = ''
    laboratorio.value = ''
    resultado.value = ''
    fecha_registro.value = ''
    estado.value = ''
    modalArticulo.show()
    opcion = 'crear'
})

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
                            <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>
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

//Procedimiento Borrar
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const id_diagnostico = fila.firstElementChild.innerHTML
    alertify.confirm("This is a confirm dialog.", 
    function  (){
        fetch(url+id_diagnostico, {
            method: 'DELETE'
        })
        .then( res => res.json() )
        .then( ()=> location.reload())
        //alertify.success('Ok')
    },
    function(){
        alertify.error('Cancel')
    })
})

//Procedimiento Editar
let id_diagnosticoForm = 0
on(document, 'click', '.btnEditar', e => {    
    const fila = e.target.parentNode.parentNode
    id_diagnosticoForm = fila.children[0].innerHTML
    const id_reservacionForm = fila.children[1].innerHTML
    const comentariosForm = fila.children[2].innerHTML
    const laboratorioForm = fila.children[3].innerHTML
    const resultadoForm = fila.children[4].innerHTML
    const fecha_registroForm = fila.children[5].innerHTML
    const estadoForm= fila.children[6].innerHTML
    
    id_reservacion.value =  id_reservacionForm
    comentarios.value =  comentariosForm
    laboratorio.value = laboratorioForm
    resultado.value =  resultadoForm
    fecha_registro.value =  fecha_registroForm
    estado.value =  estadoForm
    
    opcion = 'editar'
    modalArticulo.show()
     
})

//Procedimiento para Crear y Editar
formArticulo.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(opcion=='crear'){        
        //console.log('OPCION CREAR')
        fetch(url, {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                id_reservacion:id_reservacion.value, 
                comentarios:comentarios.value,
                laboratorio:laboratorio.value, 
                resultado:resultado.value, 
                fecha_registro:fecha_registro.value,
                estado:estado.value
            })
        })
        .then( response => response.json() )
        .then( data => {
            const nuevoArticulo = []
            nuevoArticulo.push(data)
            mostrar(nuevoArticulo)
        })
    }
    if(opcion=='editar'){    
        //console.log('OPCION EDITAR')
        fetch(url+id_diagnosticoForm,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                id_reservacion:id_reservacion.value, 
                comentarios:comentarios.value,
                laboratorio:laboratorio.value, 
                resultado:resultado.value, 
                fecha_registro:fecha_registro.value,
                estado:estado.value
            })
        })
        .then( response => response.json() )
        .then( response => location.reload() )
    }
    modalArticulo.hide()
})