import React,{Component} from 'react'
import PublicacionesList from './PublicacionesList'
import Translate from './Translate'
import Loading from './loading'
import IconButton from '@material-ui/core/IconButton';
import { getUser,
    getUserLogged,
loadPublicacionesUser,
loadSeguidos,
follow,
unFollow} from '../Services/Api'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
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
            isLoading : true,
            userLogged: null,
            siguiendo : false
        }
        this.handleOnFollow = this.handleOnFollow.bind(this)    
        this.handleOnUnfollow = this.handleOnUnfollow.bind(this)    
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
        const userLogged = await getUserLogged()
        const nombreUsuario = userLogged.userName
        this.setState({
            userLogged : nombreUsuario
        })
        const seguidos = await loadSeguidos({nombreUsuario})
        // eslint-disable-next-line array-callback-return
        seguidos.map(seg => {

            if(seg.seguido === userData.userName){
                this.setState({
                    siguiendo : true
                })
            }
            }
            )

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

    async handleOnFollow(){
        const userLogged = this.state.userLogged
        const userFollow = this.state.userName
        try {
            await follow({userLogged,userFollow})
            window.location.reload()
        } catch (error) {
            throw error
        }
    }
    async handleOnUnfollow(){
        const userLogged = this.state.userLogged
        const userUnfollow = this.state.userName
        try {
            await unFollow({userLogged,userUnfollow})
            window.location.reload()
        } catch (error) {
            throw error
        }
    }
    render(){
     
   
        if(this.state.isLoading ){
            return(
                <Loading 
                    message = "Cargando Usuario"/>
            )
        }else if(this.state.siguiendo && this.state.userLogged !== this.state.userName){
        return(
            <React.Fragment>

            
            <div className = "mx-auto">
                <div className="card">
                        <img className="card-img-top fotoPerfilUsuario" src={this.state.profilePic} alt="ProfilePic"/>
                        <div className="card-body userDescription">
                            <h5 className="card-title">{this.state.userName}    
                            <IconButton onClick={this.handleOnUnfollow}> 
                                <PersonAddDisabledIcon/>
                            </IconButton>     
                             </h5>
                            <p className="card-text"><small className="text-muted">{this.state.name}</small></p>
                            <p className="card-text"><small className="text-muted">Seguidores : {this.state.seguidores}</small></p>  
                            <p className="card-text"><small className="text-muted">Seguidos : {this.state.seguidos}</small></p>
                        
                        </div>
                       
                </div>
                </div>
                <h1 className="mt-5 text-center ">{<Translate string={"Publicaciones"}/>}</h1>
                <PublicacionesList
                publicaciones_data = {this.state.publicacionesUsuario}/>
            </React.Fragment>   
        )}else if(!this.state.siguiendo && localStorage.getItem("token") && this.state.userLogged !== this.state.userName){
            return(
                <React.Fragment>
    
                
                <div className = "mx-auto">
                    <div className="card">
                            <img className="card-img-top fotoPerfilUsuario" src={this.state.profilePic} alt="ProfilePic"/>
                            <div className="card-body userDescription">
                                <h5 className="card-title">{this.state.userName} 
                                <IconButton onClick={this.handleOnFollow}>
                                    <PersonAddIcon/>
                                </IconButton>   
                                </h5>
                                <p className="card-text"><small className="text-muted">{this.state.name}</small></p>
                                <p className="card-text"><small className="text-muted">Seguidores : {this.state.seguidores}</small></p>  
                                <p className="card-text"><small className="text-muted">Seguidos : {this.state.seguidos}</small></p>
                               
                            </div>
                           
                    </div>
                    </div>
                    <h1 className="mt-5 text-center ">{<Translate string={"Publicaciones"}/>}</h1>
                    <PublicacionesList
                    publicaciones_data = {this.state.publicacionesUsuario}/>
                </React.Fragment>   
            )}else if(this.state.userName === this.state.userLogged){
                return(
                    <React.Fragment>
        
                    
                    <div className = "mx-auto">
                        <div className="card">
                                <img className="card-img-top fotoPerfilUsuario" src={this.state.profilePic} alt="ProfilePic"/>
                                <div className="card-body userDescription">
                                    <h5 className="card-title">{this.state.userName} </h5>
                                    <p className="card-text"><small className="text-muted">{this.state.name}</small></p>
                                    <p className="card-text"><small className="text-muted">Seguidores : {this.state.seguidores}</small></p>  
                                    <p className="card-text"><small className="text-muted">Seguidos : {this.state.seguidos}</small></p> 
                                </div>
                               
                        </div>
                        </div>
                        <h1 className="mt-5 text-center ">{<Translate string={"Publicaciones"}/>}</h1>
                        <PublicacionesList
                        publicaciones_data = {this.state.publicacionesUsuario}
                        propietario = {true}
                        />
                        
                    </React.Fragment>   
                )
            }else {
                return(
                    <React.Fragment>
        
                    
                    <div className = "mx-auto">
                        <div className="card">
                                <img className="card-img-top fotoPerfilUsuario" src={this.state.profilePic} alt="ProfilePic"/>
                                <div className="card-body userDescription">
                                    <h5 className="card-title">{this.state.userName} </h5>
                                    <p className="card-text"><small className="text-muted">{this.state.name}</small></p>
                                    <p className="card-text"><small className="text-muted">Seguidores : {this.state.seguidores}</small></p>  
                                    <p className="card-text"><small className="text-muted">Seguidos : {this.state.seguidos}</small></p> 
                                </div>
                               
                        </div>
                        </div>
                        <h1 className="mt-5 text-center ">{<Translate string={"Publicaciones"}/>}</h1>
                        <PublicacionesList
                        publicaciones_data = {this.state.publicacionesUsuario}
                        />
                        
                    </React.Fragment>   
                )}
    }
}
Usuario.propTypes = {}
Usuario.defaultProps = {}
