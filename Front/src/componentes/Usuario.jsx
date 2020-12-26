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
                <div class="row mx-auto">
                    <div class="card mx-auto border-dark">
                        <img class="card-img-top fotoPerfilUsuario" src="USUARIOFOTO" alt="ProfilePic"/>
                        <div class="card-body">
 <h5 class="card-title">{<Translate string={"Usuario"}/>} </h5>
                            <p class="card-text"><small class="text-muted">{<Translate string={"Usuario_nombre"}/>}</small></p>
                            <p class="card-text"><small class="text-muted">{<Translate string={"username"}/>}</small></p>
                            <p class="card-text"><small class="text-muted">{<Translate string={"Fecha_de_nacimiento"}/>}</small></p>  
                            <p class="card-text"><small class="text-muted">{<Translate string={"Seguidores"}/>}</small></p>  
                            <p class="card-text"><small class="text-muted">{<Translate string={"Seguidos"}/>}</small></p>  
                        </div>
                    </div>     
                </div>
                <h1 class="mt-5 text-center">{<Translate string={"Publicaciones"}/>}</h1>
                <PublicacionesList/>
            </div>
        )
    }
}
Usuario.propTypes = {}
Usuario.defaultProps = {}
