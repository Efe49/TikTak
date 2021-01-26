import {AddAPhoto} from '@material-ui/icons'
import { Component } from 'react'
import Translate from './Translate'
import { addPublicacion } from '../Services/Api'
import {getUserLogged } from '../Services/Api'
export default class PublicacionAdd extends Component{
	constructor(...props){
		super(...props)
			this.state={
					titulo : "",
					descripcion : "",
					contenido : ""			
		}
		this.handleOnAddPublicacion = this.handleOnAddPublicacion.bind(this)
		this.handleOnChangeTitulo = this.handleOnChangeTitulo.bind(this)
		this.handleOnChangeDescripcion = this.handleOnChangeDescripcion.bind(this)
		this.handleOnChangeContenido = this.handleOnChangeContenido.bind(this)

	}
	handleOnChangeTitulo(e){
		e.persist()
		this.setState({
				titulo : e.target.value
		})
		e.preventDefault()
	}
	handleOnChangeDescripcion(e){
		e.persist()
		this.setState({
				descripcion : e.target.value
		})
		e.preventDefault()
	}
	handleOnChangeContenido(e){
		e.persist()
		this.setState({
				contenido : e.target.files[0]
		})
		e.preventDefault()
	}

	async handleOnAddPublicacion(e){
		e.persist()
		const titulo = this.state.titulo
		const descripcion = this.state.descripcion
		const contenido = this.state.contenido
		try{
			const user =  await getUserLogged()
			const userName = user.userName
			await addPublicacion({titulo,descripcion,contenido,userName})
		}catch(error){
			throw error
		}
		
		

            
        e.preventDefault()

	}
	render(){
		return(


    <div className="container login-box">
		<div className="center_div px-auto border mt-5 mb-5">
			
			<h1 className="text-center mt-4 mb-3">{<Translate string={"Nueva_publicacion"}/>}</h1><br/>	
			<div className="mx-auto px-auto">
				<div className="form" name = 'Form'> 
					<div className="form-group row px-auto ml-5 mr-5">
						<label>{<Translate string={"Titulo"}/>}</label>
						<input type = 'text' name = 'titulo' id = 'titulo' className= 'form-control' onChange={this.handleOnChangeTitulo}required /*onblur="comprobarAlfanum(this,25)"*//><br/>
					</div>
					<div className="form-group row ml-5 mr-5">
						<label>{<Translate string={"Descripcion"}/>}</label>
						<textarea className='form-control' name = 'descripcion' id = 'descripcion' onChange={this.handleOnChangeDescripcion} required  /*onblur="return comprobarAlfanum(this,240)"*/></textarea><br/>
					</div>
					<div className="input-group mx-auto">
						<div className="input-group-prepend">
							<span className="input-group-text">{<Translate string={"Seleccionar_multimedia"}/>}</span>
						</div>
						<div className="custom-file">
							<input type="file" name="multimedia" className="custom-file-input" onChange={this.handleOnChangeContenido} required id="inputArchive"/>
							<label className="custom-file-label" for="inputGroupFile01">{<Translate string={"Seleccionar_archivo"}/>}</label>
						</div>
					</div>
					<div className="btn-group col text-center center-div mt-3 mb-1">
						<button className="btn btn-info mb-3" onClick={this.handleOnAddPublicacion} >
							<AddAPhoto/>    
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>	
		)
	}
}
