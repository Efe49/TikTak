import React,{Component} from 'react'
import PublicacionesList from './PublicacionesList'
import Translate from './Translate'

export default class Usuario extends Component {

    constructor(...props){
        super(...props)
        this.state = {}
        
    }
    render(){
        return(
            <div>
                <div className="row mx-auto">
                    <div className="card mx-auto border-dark">
                        <img className="card-img-top fotoPerfilUsuario" src="USUARIOFOTO" alt="ProfilePic"/>
                        <div className="card-body">
 <h5 className="card-title">{<Translate string={"Usuario"}/>} </h5>
                            <p className="card-text"><small className="text-muted">{<Translate string={"Usuario_nombre"}/>}</small></p>
                            <p className="card-text"><small className="text-muted">{<Translate string={"username"}/>}</small></p>
                            <p className="card-text"><small className="text-muted">{<Translate string={"Fecha_de_nacimiento"}/>}</small></p>  
                            <p className="card-text"><small className="text-muted">{<Translate string={"Seguidores"}/>}</small></p>  
                            <p className="card-text"><small className="text-muted">{<Translate string={"Seguidos"}/>}</small></p>  
                        </div>
                    </div>     
                </div>
                <h1 className="mt-5 text-center">{<Translate string={"Publicaciones"}/>}</h1>
                <PublicacionesList/>
            </div>
        )
    }
}
Usuario.propTypes = {}
Usuario.defaultProps = {}
