import {AddAPhoto} from '@material-ui/icons'
import { Component } from 'react'
import Translate from './Translate'


export default class PublicacionAdd extends Component{
	constructor(...props){
		super(...props)
			this.state={

			
		}
		this.handleOnAddPublicacion = this.handleOnAddPublicacion.bind(this)
	}


	handleOnAddPublicacion(e){
		e.persist()
		let historial = this.props;
var urlencoded = new URLSearchParams()
        urlencoded.append("titulo", e.target.titulo.value )
        urlencoded.append("Descripcion", e.target.descripcion.value )
		urlencoded.append("meGusta", 0)
		urlencoded.append("noMeGusta", 0)

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization' : localStorage.getItem('token')
            },
            body: urlencoded
        };
        fetch('http://localhost:3001/api/Publicaciones', requestOptions)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                
                historial.history.push("/")
                
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
			<h1 class="text-center mt-4 mb-3">{<Translate string={"Nueva_publicacion"}/>}</h1><br/>	
			<div class="mx-auto px-auto">
				<form class="form" name = 'Form' action='../Controllers/Publicacion_Controller.php' method='post'> 
					<div class="form-group row px-auto ml-5 mr-5">
						<label>{<Translate string={"Titulo"}/>}</label>
						<input type = 'text' name = 'titulo' id = 'titulo' class = 'form-control' /*onblur="comprobarAlfanum(this,25)"*//><br/>
					</div>
					<div class="form-group row ml-5 mr-5">
						<label>{<Translate string={"Descripcion"}/>}</label>
						<textarea class='form-control' name = 'descripcion' id = 'descripcion'   /*onblur="return comprobarAlfanum(this,240)"*/></textarea><br/>
					</div>
					<div class="input-group mx-auto">
						<div class="input-group-prepend">
							<span class="input-group-text">{<Translate string={"Seleccionar_multimedia"}/>}</span>
						</div>
						<div class="custom-file">
							<input type="file" name="multimedia" class="custom-file-input" id="inputGroupFile01"/>
							<label class="custom-file-label" for="inputGroupFile01">{<Translate string={"Seleccionar_archivo"}/>}</label>
						</div>
					</div>
					<div class="btn-group col text-center center-div mt-3 mb-1">
						<button class="btn btn-info mb-3" type='submit' name='action' value='addPublicacion'>
							<AddAPhoto/>    
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>	
		)
	}
}
