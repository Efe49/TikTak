import React, {
    Component
} from 'react'
import PropTypes from 'prop-types'
import { loadHomePageNotLogged, 
    getUserLogged,
    loadSeguidos,
    loadHomePageLogged,
    loginUsuario

} from '../Services/Api'
import Loading from './loading'
import Home from './Home'
import Login from './Login'
import Registro from './Registro'
import Usuario from './Usuario'
import PublicacionAdd from './PublicacionAdd'
import Header from './Header'
import Footer from './Footer'
import IdiomaContext from '../Context/IdiomaContext'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import './componentes.css'
//import publicaciones_data from '../Files/publicaciones.json'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';



class App extends Component {
    constructor(...props) {
        super(...props)

        this.state = {
            isLoading : true,
            publicaciones_data: null,
            seguidos: null,
            userName: null,
            userLogged: null,
            redirect: null,
            preferredLocale: "es"

        }

        this.handleOnAddUsuario = this.handleOnAddUsuario.bind(this)
        this.changeLanguage = this.changeLanguage.bind(this)
        this.handleOnLogOut = this.handleOnLogOut.bind(this)
    }
    async componentDidMount() {
        this.setState({
            isLoading : true
        })
        let Allpublicaciones = []
        
        //Obtenemos una lista de todas las publicaciones
        try {

            const allPosts = await loadHomePageNotLogged()
            Allpublicaciones = allPosts;

        } catch (error) {
            
            throw error

        }

       if(localStorage.getItem("token")){
        //Si existe un token guardado hay un usuario loggeado
        try {
        //obtenemos los datos del usuario
            const usuarioLogged = await getUserLogged()
            this.setState({
                userLogged : usuarioLogged 
            })
        //obtenemos los seguidos del usuario
            const nombreUsuario = this.state.userLogged.userName
            this.setState({
                userName : nombreUsuario
            })
            const followed = await loadSeguidos({nombreUsuario})
            this.setState({
                seguidos : followed
            })
        //Obtenemos las publicaciones de los seguidos
        if(this.state.seguidos.length !== 0){
            const seguidos = this.state.seguidos
            const publicaciones = Allpublicaciones
            const postFollowed  =  loadHomePageLogged({seguidos , publicaciones})
            
            this.setState({
                publicaciones_data : postFollowed,
                isLoading: false
            })

        }else{
            this.setState({
                publicaciones_data : Allpublicaciones,
                isLoading : false
            })
        }

        } catch (error) {
            throw error
        }
          
       } else{

            this.setState({
                publicaciones_data : Allpublicaciones,
                isLoading : false
            })
       }
       

    }
    async handleOnUserLogin({userName,password}) {
            console.log({userName, password})
     try {

                await loginUsuario()

                if(this.state.userLogged){
                  const usuarioLoggueado = await getUserLogged()
                  this.setState({
                  userLogged : usuarioLoggueado,
                  isLoading : false
                })
            }
                
     } catch (error) {
         throw error
     }

    }
    async handleOnAddUsuario(e) {
        e.persist();
        let form = e.target,
            usuario = {
                profilePic: form.profilePic.value ? form.profilePic.value : App.defaultProps.profilePic,
                password: form.password.value,
                userName: form.userName.value,
                name: form.name.value,
                email: form.email.value,
                seguidores: App.defaultProps.seguidores,
                seguidos: App.defaultProps.seguidos

            }
        var urlencoded = new URLSearchParams()
        urlencoded.append("profilePic", usuario.profilePic)
        urlencoded.append("password", usuario.password)
        urlencoded.append("userName", usuario.userName)
        urlencoded.append("name", usuario.name)
        urlencoded.append("email", usuario.email)
        urlencoded.append("seguidores", usuario.seguidores)
        urlencoded.append("seguidos", usuario.seguidos)

        const requestOptions = {
            method: 'Post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',

            },
            body: urlencoded
        };
        fetch('http://localhost:3001/api/Usuarios', requestOptions)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                localStorage.setItem('token', "Bearer " + data.token)
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': localStorage.getItem('token')
                    },
                };
                fetch('http://localhost:3001/api/usuario', requestOptions)
                    .then((response) => {
                        return response.json()
                    })
                    .then((userLogged) => {
                        this.setState({
                            userLogged: userLogged
                        })
                    })

            })
            .catch(error => {

                console.error('There was an error!', error);
            });

        e.preventDefault()
    }

    handleOnLogOut(e){
        e.persist()
        this.setState({isLoading : true})
        localStorage.removeItem("token")
        this.setState({isLoading : false, userLogged : null  })
        window.location.reload()
        e.preventDefault()
        }


    handleOnAddPublicacion(e) {
        e.persist();
        alert('Evento Realizandose')
        e.preventDefault()

        let form = e.target,
            usuario = {
                id: form.id.value,
                name: form.name.value ? form.name.value : App.defaultProps.name,
                age: form.age.value ? form.age.value : App.defaultProps.age,
                company: form.company.value ? form.company.value : App.defaultProps.company,
                email: form.email.value ? form.email.value : App.defaultProps.email,
                phone: form.phone.value ? form.phone.value : App.defaultProps.phone

            }

        this.setState({
            usuarios: this.state.usuarios.concat([usuario])
        })
    }
    changeLanguage = ({
        currentTarget: {
            id
        }
    }) => {
        this.setState({
            preferredLocale: id,
        });
    }
    render() {
            if (this.state.isLoading) {
                return (
                   <Loading
                   message ="Cargando contenido"
                   />
                )
            }else{

            
            return (
        <div>
            <IdiomaContext.Provider value={this.state.preferredLocale}>

                <Router>
                    <Header 
                    changeLanguage={this.changeLanguage} 
                    handleOnLogOut = {this.handleOnLogOut}
                    handleOnLogIn = {this.handleOnUserLogin} 
                    userName = {this.state.userName}
                    />

                    <Switch>
                        <Route exact path="/" render={(props)=>
                            <Home {...props} publicaciones_data={this.state.publicaciones_data}
                                changeLanguage={this.changeLanguage} />} />
                            <Route exact path="/Registro" render={(props)=>
                                <Registro {...props} onAddUsuario={this.handleOnUserLogged()}
                                    changeLanguage={this.changeLanguage} />} />
                                <Route exact path="/Login" render={(props)=>
                                    <Login {...props} onLoginUsuario={this.handleOnUserLogin()}
                                        changeLanguage={this.changeLanguage} />} />
                                    <Route exact path="/Usuario" render={(props)=>
                                        <Usuario {...props} changeLanguage={this.changeLanguage} />}/>
                                        <Route exact path="/PublicacionAdd" render={(props)=>
                                            <PublicacionAdd {...props} changeLanguage={this.changeLanguage} />}/>
                                            <Route render={()=>
                                                <h1>Not found!</h1>} />

                    </Switch>
                    <Footer changeLanguage={this.changeLanguage} />
                </Router>
            </IdiomaContext.Provider>

        </div>
        )}
    }
}


App.propTypes = { 
    profilePic: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    seguidores: PropTypes.number.isRequired,
    seguidos: PropTypes.number.isRequired
 }
App.defaultProps = {
    password: 'PropTypes.string.isRequired',
    userName: 'PropTypes.string.isRequired',
    name: 'PropTypes.string.isRequired',
    email: 'PropTypes.string.isRequired',
  seguidores: 0,
  seguidos:0,
  profilePic: 'Foto de perfil'
}

export default App