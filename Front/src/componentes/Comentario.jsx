import React from 'react'

const Comentario = (props) => (
    
    <li key={props.id} class="list-group-item mx-auto justy-content comentariosTitle">
        
        <p>
            {props.contenido}
        </p>
    </li>
)

export default Comentario