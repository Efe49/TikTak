import {React, Component} from 'react'

import Avatar from '@material-ui/core/Avatar';
import logoTik from '../Assets/logo.jpg'
import English from '../Assets/English.png'
import Spanish from '../Assets/Spanish.png'
import { Dropdown} from 'react-bootstrap'
import {Explore} from '@material-ui/icons'
import GTranslateOutlinedIcon from '@material-ui/icons/GTranslateOutlined';
import LogOut from './Dialogos/DialogoLogOut'
import Register from './Dialogos/DialogoRegister'
import LogIn from './Dialogos/DialogoLogIn'
import AddPost from './Dialogos/DialogoAddPost'
import {Link} from 'react-router-dom'
import { loginUsuario } from '../Services/Api'
import { RegisterUsuario } from '../Services/Api'
import { RegisterUsuarioPP } from '../Services/Api'
import { addPublicacion } from '../Services/Api'
import {getUserLogged } from '../Services/Api'


export default class Header extends Component{ 
    
     constructor(props){
        super(props)
        
        this.state = {
            userName : "username",
            password :  "",
            email : "",
            name : "",
            profilePic : null,
            profilePicSrc : "",
            isLoading: false,
            contenido: "",
            titulo : "",
            descripcion : ""
        }
        this.handleOnChangeU = this.handleOnChangeU.bind(this)
        this.handleOnChangeP = this.handleOnChangeP.bind(this)
        this.handleOnChangePP = this.handleOnChangePP.bind(this)
        this.handleOnChangeN = this.handleOnChangeN.bind(this)
        this.handleOnChangeE = this.handleOnChangeE.bind(this)
        this.handleOnLogIn = this.handleOnLogIn.bind(this)
        this.handleOnRegister = this.handleOnRegister.bind(this)
        this.handleOnChangeTitle = this.handleOnChangeTitle.bind(this)
        this.handleOnChangeDescription = this.handleOnChangeDescription.bind(this)
        this.handleOnChangeContent = this.handleOnChangeContent.bind(this)
        this.handleOnAddPublicacion = this.handleOnAddPublicacion.bind(this)        
    }
    handleOnChangeU(e){
        e.persist()
        this.setState({
            userName : e.target.value
        })
        e.preventDefault()
    }
	handleOnChangeTitle(e){
		e.persist()
		this.setState({
				titulo : e.target.value
		})
		e.preventDefault()
	}
	handleOnChangeDescription(e){
		e.persist()
		this.setState({
				descripcion : e.target.value
		})
		e.preventDefault()
	}
	handleOnChangeContent(e){
		e.persist()
		this.setState({
				contenido : e.target.files[0]
		})
		e.preventDefault()
	}

	async handleOnAddPublicacion(){
		
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
		window.location.reload()
		

            
       

	}
    handleOnChangePP(e){
        e.persist()
        this.setState({
            profilePic : e.target.files[0]
        })
        e.preventDefault()
    }
    
    handleOnChangeE(e){
        e.persist()
        this.setState({
            email : e.target.value
        })
        e.preventDefault()
    }
    
    handleOnChangeN(e){
        e.persist()
        this.setState({
            name : e.target.value
        })
        e.preventDefault()
    }
    async handleOnLogIn(){
       const usuario = this.state.userName
       const password = this.state.password
        try {
            await loginUsuario({usuario,password})
        } catch (error) {
            throw error
        }
        window.location.reload()
    }

    async handleOnRegister(){
        const email = this.state.email
        const usuario = this.state.userName
        const password = this.state.password
        const name = this.state.name
        this.setState({isLoading : true})
        if (this.state.profilePic){
            const profilePic = this.state.profilePic
            try {
                await RegisterUsuarioPP({usuario,password,email,name,profilePic})
                this.setState({isLoading : false})
            } catch (error) {
                throw error
            }
        }else{
            try {
                await RegisterUsuario({usuario,password,email,name})
                this.setState({isLoading : false})
            } catch (error) {
                throw error
            }

        }
         window.location.reload()
     }
    handleOnChangeP(e){
        e.persist()
        this.setState({
            password : e.target.value
        })
        e.preventDefault()
    }
componentDidMount(){
    
    if(this.props.userName){
        
        this.setState({
            userName : this.props.userName,
            profilePicSrc : this.props.profilePic,
            isLoading : true
        })
    }
    this.setState({
        isLoading : false
    })
}





    render(){  
        if(localStorage.getItem("token") && !this.state.isLoading){
            return (
                <header>
                    <nav className ="navbar headerTik justify-content-between fixed-top mb-5">

                    <div className="home-buttons">
                      
                            <AddPost
                   handleOnAddPublicacion = {this.handleOnAddPublicacion}
                   changeTitle = {this.handleOnChangeTitle}
                   changeContent = {this.handleOnChangeContent}
                   changeDescription = {this.handleOnChangeDescription}
                   />
                           
                        
                    
                    
                    
                                <button className="btn border-dark rounded-circle ml-5">
                            <Link to="/Explore">
                                <Explore/>
                            </Link>
                        </button>
                    </div>
                    
                    <Link to="/">
                                <img className="logoTik mx-auto" src={logoTik} alt="TikTak"/>
                    </Link>
                    
                            <span className="form-inline my-2 my-lg-0" >    
                <span className="mx-auto">
                    <Avatar className = "mx-auto" alt={this.state.userName} src={this.state.profilePicSrc}/>         

                    <Link to={{pathname : `/Usuario/${this.state.userName}`,
                                        usuario : this.state.userName}}>
                                <p>{this.state.userName}</p>    
                            </Link> 

                </span>

                  <span className = "ml-3" >
                                <LogOut  handleOnLogOut = {this.props.handleOnLogOut}/>
                                <span className="mx-auto">
                        <Dropdown >
                            <Dropdown.Toggle variant="secondary"  id="dropdown-basic">
                                <GTranslateOutlinedIcon/>
                            </Dropdown.Toggle>
        
                            <Dropdown.Menu>
                                <Dropdown.Item >
                                            <button id="en" onClick={this.props.changeLanguage}>  
                                                <img name ="en" src={English} className="img-fluid mx-auto " width="30" alt="English"/>
                                    </button>
                                </Dropdown.Item>
        
                                <Dropdown.Item>
                                            <button id = "es" onClick={this.props.changeLanguage}> 
                                                <img name ="es" src={Spanish} className="img-fluid mx-auto " width="30" alt="Spanish"/>
                                    </button>
                                </Dropdown.Item>
                            </Dropdown.Menu>
        
                        </Dropdown>              

                                </span>

                  </span>
                       
                        
                    </span>
                </nav>
            </header>
        )
            }else{
        return (
    <header>
        <nav className ="navbar headerTik justify-content-between fixed-top mb-5">

            <div className="home-buttons">
            <AddPost
                   handleOnAddPublicacion = {this.handleOnAddPublicacion}
                   changeTitle = {this.handleOnchangeTitle}
                   changeContent = {this.handleOnchangeContent}
                   changeDescription = {this.handleOnchangeDescription}
                   />
            
            
            
                        <button className="btn border-dark rounded-circle ml-5">
                    <Link to="/">
                        <Explore/>
                    </Link>
                </button>
            </div>
            
            <Link to="/">
                        <img className="logoTik mx-auto" src={logoTik} alt="TikTak"/>
            </Link>
            <span className="form-inline my-2 my-lg-0" >
                <span className = "mr-2">

                   <Register
                   handleOnRegister = {this.handleOnRegister}
                   changeU = {this.handleOnChangeU}
                   changeN = {this.handleOnChangeN}
                   changeE = {this.handleOnChangeE}
                   changePw = {this.handleOnChangeP}
                   changePP = {this.handleOnChangePP}
                   />

                   <LogIn
                   handleOnLogIn = {this.handleOnLogIn}
                   changeP = {this.handleOnChangeP}
                   changeU = {this.handleOnChangeU}
                   />
                </span>

               <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        <GTranslateOutlinedIcon/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item >
                                    <button id="en" onClick={this.props.changeLanguage}>  
                                        <img name ="en" src={English} className="img-fluid mx-auto " width="30" alt="English"/>
                            </button>
                        </Dropdown.Item>

                        <Dropdown.Item>
                                    <button id = "es" onClick={this.props.changeLanguage}> 
                                        <img name ="es" src={Spanish} className="img-fluid mx-auto " width="30" alt="Spanish"/>
                            </button>
                        </Dropdown.Item>
                    </Dropdown.Menu>

                </Dropdown>              
                
            </span>
        </nav>
    </header>
        )
    };
    }
}