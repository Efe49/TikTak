import React, {
    Component
} from 'react'
import PropTypes from 'prop-types'

import Home from './Home'
import Login from './Login'
import Registro from './Registro'
import Usuario from './Usuario'
import PublicacionAdd from './PublicacionAdd'
import Header from './Header'
import Footer from './Footer'
import IdiomaContext from '../Context/IdiomaContext'

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
            publicaciones_data: [],
            seguidos: [],
            userLogged : [],
            redirect: null,
            preferredLocale:"es"

        }
     
        this.handleOnAddUsuario = this.handleOnAddUsuario.bind(this)
        this.handleOnLoginUsuario = this.handleOnLoginUsuario.bind(this)
          this.changeLanguage = this.changeLanguage.bind(this)

    }
    componentDidMount() {
        
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
                .then((userLogged1) => {
                   
                        this.setState({
                            userLogged : userLogged1
                        })
                    
                })
               
    
    
        fetch('http://localhost:3001/api/publicaciones')
            .then((response) => {
                return response.json()
            })
            .then((publicaciones_data) => {
                this.setState({
                    publicaciones_data: publicaciones_data
                })
            })
        if (this.state.userLogged !== []) {
            fetch('http://localhost:3001/api/seguidores/' + this.state.userLogged.userName)
                .then((response) => {
                    return response.json()
                })
                .then((seguidos) => {
                    if (seguidos !== []) {

                        let publicacionesSeguidos = [];
                        let seguidosMapped = seguidos.map(seguido => {
                            let publicacionesMapped = this.state.publicaciones_data.map(publicacion => {
                                if (seguido.seguido === publicacion.creador) {
                                    publicacionesSeguidos.push(publicacion)
                                }
                                return 1
                            })
                            return 1
                        })
                        this.setState({
                            publicaciones_data: publicacionesSeguidos
                        })

                    }
                })
        }

    }
    async handleOnUserLogged() {
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
        urlencoded.append("profilePic", usuario.profilePic )
        urlencoded.append("password", usuario.password )
        urlencoded.append("userName", usuario.userName )
        urlencoded.append("name", usuario.name )
        urlencoded.append("email", usuario.email )
        urlencoded.append("seguidores", usuario.seguidores )
        urlencoded.append("seguidos", usuario.seguidos )

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

    handleOnLoginUsuario(e) {
       e.persist()
        var urlencoded = new URLSearchParams()
        urlencoded.append("userName", e.target.userName)
        urlencoded.append("password", e.target.password )


        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',

            },
            body: urlencoded
        };
        fetch('http://localhost:3001/api/Usuario', requestOptions)
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
     changeLanguage = ({ currentTarget: {id}}) => {
        this.setState ({
            preferredLocale: id,
        });
    }
    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
        return (
            <div>
                <IdiomaContext.Provider value={this.state.preferredLocale}>

                <Router>
                                          <Header changeLanguage={this.changeLanguage} />

                        <Switch>
<Route exact path="/" render={(props) => <Home {...props} publicaciones_data={this.state.publicaciones_data} changeLanguage={this.changeLanguage}/>}  />
                                <Route exact path="/Registro" render={(props) => <Registro {...props} onAddUsuario = {this.handleOnUserLogged()} changeLanguage={this.changeLanguage}/>} />
                                <Route exact path="/Login" render={(props) => <Login {...props} onLoginUsuario = {this.handleOnUserLogged()} changeLanguage={this.changeLanguage}/>} />
                                <Route exact path="/Usuario" render={(props) => <Usuario {...props} changeLanguage={this.changeLanguage}/>}/>
                                <Route exact path="/PublicacionAdd" render={(props) => <PublicacionAdd {...props} changeLanguage={this.changeLanguage}/>}/>
                            <Route render={() => <h1>Not found!</h1>} />

                        </Switch>
                        <Footer changeLanguage={this.changeLanguage}/>    
                </Router>
                </IdiomaContext.Provider>

            </div>
        )
    }
}

/*function TransLate(){
    const [locale, setLocale] = useState("es");

        const handleSelect = e => {
            setLocale(e.target.value);
        };
}*/

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