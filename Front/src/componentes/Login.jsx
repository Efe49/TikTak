import React, {
    Component
} from 'react'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import {Link} from 'react-router-dom'
import App from '.'
import Translate from './Translate'

export default class Login extends Component {
    constructor(...props) {
        super(...props)

        this.state = {

        }
     this.handleOnChangeRoute = this.handleOnChangeRoute.bind(this)

    }
handleOnChangeRoute(e){
e.persist()
let historial = this.props
var urlencoded = new URLSearchParams()
        urlencoded.append("userName", e.target.userName.value )
        urlencoded.append("password", e.target.password.value )


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
                historial.history.push("/")
                this.props.onLoginUsuario()
            })
            .catch(error => {

                console.error('There was an error!', error);
            });

            
        e.preventDefault()

}


   
render(){
    return(
    <div class="container login-box">
        <div class="center_div px-auto border mt-5 mb-5">
            <h1 class="text-center mt-4 mb-3" >LOGIN</h1>
            <div class="mx-auto px-auto">
                <form class="form " onSubmit={this.handleOnChangeRoute}>
                    <div class="form-group row px-auto ml-5 mr-5">
                        <label> {<Translate string={"username"}/>} : </label>
                        <input type = 'text' name = 'userName' id = 'userName' class = 'form-control' /><br/>
                    </div>
                    <div class="form-group row ml-5 mr-5">
                        <label>{<Translate string={"Contraseña"}/>} : </label>
                        <input type = 'password' name = 'password' id = 'password' class = 'form-control'/><br/>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="customCheck1" />
                            <label class="custom-control-label" for="customCheck1">{<Translate string={"Mostrar_contraseña"}/>}</label>
                        </div>
                    </div>
                    <div class="btn-group col text-center center-div mx-auto">
                        <button class="btn btn-info mb-3" type='submit'>
                            <Link to ="/">
                            <ExitToAppIcon/>
                            </Link>
                            
                        </button>
                    </div>
                </form>
            </div>
        </div>	

    </div>
    )
}
}
