import React,{Component} from 'react'
import PublicacionesList from './PublicacionesList'
import Translate from './Translate'
import Loading from './loading'
import { getUser,
loadPublicacionesUser} from '../Services/Api'
import { TimerOutlined } from '@material-ui/icons'
export default class Usuario extends Component {

    constructor(...props){
        super(...props)
        this.state = {
            profilePic : null,
            name : null,
            userName : null,
            seguidores : null,
            seguidos : null,
            publicacionesUsuario : null,
            isLoading : true
        }
        
    }
   async componentDidMount(){
    this.setState({
        isLoading : true
    })
    
    let userData = []
    let publicacionesUser = []
    
    try {
        const userName = this.props.match.params.usuario
        const usData = await getUser({userName})
        userData = usData
        const publiUser = await loadPublicacionesUser({userName})
        publicacionesUser = publiUser
    } catch (error) {
        
      
        throw error
    }
       setTimeout(()=>
        this.setState({
            profilePic : userData.profilePic,
            name : userData.name,
            userName : userData.userName,
            seguidores : userData.seguidores,
            seguidos : userData.seguidos,
            publicacionesUsuario : publicacionesUser,
            isLoading : false
        }),400)

        

    }
   async componentDidUpdate(prevProps) {
        if(this.props.match.params.usuario !== prevProps.match.params.usuario){
            this.setState({
                isLoading : true
            })
            
            let userData = []
            let publicacionesUser = []
            
            try {
                const userName = this.props.match.params.usuario
                const usData = await getUser({userName})
                userData = usData
                const publiUser = await loadPublicacionesUser({userName})
                publicacionesUser = publiUser
            } catch (error) {
                
              
                throw error
            }
            setTimeout(() =>
                this.setState({
                    profilePic: userData.profilePic,
                    name: userData.name,
                    userName: userData.userName,
                    seguidores: userData.seguidores,
                    seguidos: userData.seguidos,
                    publicacionesUsuario: publicacionesUser,
                    isLoading: false
                }), 1000
            )
        }
      }
    render(){
     
   
        if(this.state.isLoading ){
            return(
                <Loading 
                    message = "Cargando Usuario"/>
            )
        }else{
        return(
            <React.Fragment>

            
            <div className = "mx-auto">
                <div className="card">
                        <img className="card-img-top fotoPerfilUsuario" src={this.state.profilePic} alt="ProfilePic"/>
                        <div className="card-body userDescription">
                            <h5 className="card-title">{<Translate string={"Usuario"}/>} </h5>
                            <p className="card-text"><small className="text-muted">{this.state.name}</small></p>
                            <p className="card-text"><small className="text-muted">{this.state.userJake}</small></p> 
                            <p className="card-text"><small className="text-muted">Seguidores : {this.state.seguidores}</small></p>  
                            <p className="card-text"><small className="text-muted">Seguidos : {this.state.seguidos}</small></p>  
                        </div>
                       
                </div>
                </div>
                <h1 className="mt-5 text-center ">{<Translate string={"Publicaciones"}/>}</h1>
                <PublicacionesList
                publicaciones_data = {this.state.publicacionesUsuario}/>
            </React.Fragment>   
        )}
    }
}
Usuario.propTypes = {}
Usuario.defaultProps = {}
