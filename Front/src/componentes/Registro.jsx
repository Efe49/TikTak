
import {DoneOutline, Clear} from '@material-ui/icons'
import App from '.'
import React, {
    Component
} from 'react'
import Translate from './Translate'


export default class Registro extends Component {
    constructor(...props) {
        super(...props)

        this.state = {

        }
     this.handleOnAddUsuario = this.handleOnAddUsuario.bind(this)

    }
    async handleOnAddUsuario(e) {
        e.persist();
        let historial = this.props
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
                historial.history.push("/")
               this.props.onAddUsuario()

            })
            .catch(error => {

                console.error('There was an error!', error);
            });

        e.preventDefault()
    }

render(){
  return  (
    <div className="container login-box mt-3 ">
        <div className="center_div px-auto border mt-5 mb-2">
            <h1 className="text-center mt-4 mb-3" ><Translate string={"Registro"}/></h1><br/>
            <div className="mx-auto px-auto">
                <form onSubmit={this.handleOnAddUsuario}  className = "border-class rounded" >
                    <div className= "form-group row px-auto ml-5 mr-5">
                        <div className="form-group col mx-auto">
                            <label><Translate string={"Nombre"}/> : </label>
                            <input type = 'text' name = 'name' id = 'name'  className = 'form-control' /* onBlur="comprobarAlfabetico(this,25)" *//>
                        </div>
                        <div className="form-group row  mx-auto">
                        <label><Translate string={"Apellidos"}/> : </label>
                            <input type = 'text' name = 'surName' id = 'surName'  className = 'form-control' /* onBlur="comprobarAlfabetico(this,25)" *//>
                        </div>
                    </div>
                    <div className="form-group row ml-5 mr-5">
                        <label> <Translate string={"Nombre_de_usuario"}/> : </label>
                        <input type = 'text' name = 'userName' id = 'userName' className = 'form-control' /* onBlur="comprobarAlfanum(this,25)" *//><br/>
                    </div>
                    <div className="form-group row ml-5 mr-5">
                        <label> <Translate string={"E_mail"}/> : </label>
                        <input type = 'email' name = 'email' id = 'email' placeholder = 'alguien@example.com' className = 'form-control' /* onBlur="comprobarCorreo(this,60)" *//><br/>
                    </div>
                    <div className="form-group row ml-5 mr-5">
                        <label><Translate string={"Contraseña"}/> : </label>
                        <input type = 'password' name = 'password' id = 'password' className = 'form-control'/*  onBlur="return comprobarAlfanum(this,128)" *//><br/>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" /* onClick="mostrarContraseña()" *//>
                            <label className="custom-control-label" htmlFor="customCheck1">{<Translate string={"Mostrar_contraseña"}/>}</label>
                        </div>
                    </div>	
                    
                    <div className="form-group row ml-5 mr-5">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">{<Translate string={"Foto_de_perfil"}/>}</span>
                            </div>
                            <div className="custom-file">
                                <input type="file" name="profilePic" className="custom-file-input" id="inputGroupFile01"/>
                                <label className="custom-file-label" htmlFor="inputGroupFile01">{<Translate string={"Seleccionar_archivo"}/>}</label>
                            </div>
                        </div>
                    </div >
                    <div className="form-group row ml-5 mr-5">
                        <div className="btn-group row col-md-12 text-center ">
                            

                            <button className="btn btn-outline-success" type='submit'  >
                              
                                    <DoneOutline/>
                                
                            </button>
                            
                            <button className="btn btn-outline-danger" type="button" role="link" /* onClick="window.location='../Controllers/Login_Controller.php';" */ ><Clear/></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
)}	
}
