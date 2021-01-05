import Publicacion from './Publicacion'

const PublicacionesList = (props) => (

    <ul className="nav container mx-auto">
        <div className="row mx-auto">
            <div className="post-box mx-auto border-dark">
                
                {props.publicaciones_data.map(
                    (publicacion,i) => (

                        <Publicacion
                            publicacion = {publicacion}
                            keyP = {i}
                            _id = {publicacion._id}
                            id = {publicacion.id}
                            contenido = {publicacion.contenido}
                            titulo = {publicacion.titulo}
                            descripcion = {publicacion.Descripcion}
                            meGusta = {publicacion.meGusta}
                            noMeGusta = {publicacion.noMeGusta}
                            creador = {publicacion.creador}
                            />
                    )
                )}
                    
                
            </div>
        </div>
    </ul>

)
   
    
export default PublicacionesList

