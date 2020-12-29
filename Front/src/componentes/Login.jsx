import React, {
    Component
} from 'react'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import {Link} from 'react-router-dom'
import Translate from './Translate'
import {loginUsuario} from '../Services/Api'


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
let form = e.target
try {
       loginUsuario({form})
      historial.history.push("/") 
} catch (error) {
    throw error 
}
       
        e.preventDefault()

}


   
render(){
    return(
    <div className="container login-box">
        <div className="center_div px-auto border mt-5 mb-5">
            <h1 className="text-center mt-4 mb-3" >LOGIN</h1>
            <div className="mx-auto px-auto">
                <form className="form " onSubmit={this.handleOnChangeRoute}>
                    <div className="form-group row px-auto ml-5 mr-5">
                        <label> {<Translate string={"username"}/>} : </label>
                        <input type = 'text' name = 'userName' id = 'userName' className= 'form-control' /><br/>
                    </div>
                    <div className="form-group row ml-5 mr-5">
                        <label>{<Translate string={"Contraseña"}/>} : </label>
                        <input type = 'password' name = 'password' id = 'password' className= 'form-control'/><br/>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" for="customCheck1">{<Translate string={"Mostrar_contraseña"}/>}</label>
                        </div>
                    </div>
                    <div className="btn-group col text-center center-div mx-auto">
                        <button className="btn btn-info mb-3" type='submit'>
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
