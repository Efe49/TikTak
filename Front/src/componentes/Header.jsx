import {React, Component} from 'react'
import logoTik from '../Assets/logo.jpg'
import English from '../Assets/English.png'
import Spanish from '../Assets/Spanish.png'
import { Dropdown} from 'react-bootstrap'
import { AddAPhoto, Explore, PersonAdd, Input, ExitToApp } from '@material-ui/icons'
import GTranslateOutlinedIcon from '@material-ui/icons/GTranslateOutlined';
import AlertDialog from './Dialogo'
import {Link} from 'react-router-dom'
import Translate from './Translate'


export default class Header extends Component{ 
    
     constructor(props){
        super(props)
        
        this.state = {
            userName : "username",
            isLoading: false
        }
    }
    
componentDidMount(){
    
    if(this.props.userName){
        
        this.setState({
            userName : this.props.userName,
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
                        <button className="btn border-dark rounded-circle ml-5">
                            <Link to="/PublicacionAdd">
                                <AddAPhoto/>
                            </Link>
                        </button>
                    
                    
                    
                                <button className="btn border-dark rounded-circle ml-5">
                            <Link to="/">
                                <Explore/>
                            </Link>
                        </button>
                    </div>
                    
                    <Link to="/">
                                <img className="logoTik mx-auto" src={logoTik} alt="TikTak"/>
                    </Link>
                            <span className="nav-tool-items mr-2 text-right" >       
        
                            <Link  to="/" onClick={this.props.handleOnLogOut}>
                                <ExitToApp/>
                            </Link> 
        
                    
                        
                            <Link to="/myProfile">
                                <h5>{this.state.userName}</h5>                          
                            </Link> 
                        
                    
        
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
            }else{
        return (
    <header>
        <nav className ="navbar headerTik justify-content-between fixed-top mb-5">

            <div className="home-buttons">
                <button className="btn border-dark rounded-circle ml-5">
                    <Link to="/PublicacionAdd">
                        <AddAPhoto/>
                    </Link>
                </button>
            
            
            
                        <button className="btn border-dark rounded-circle ml-5">
                    <Link to="/">
                        <Explore/>
                    </Link>
                </button>
            </div>
            
            <Link to="/">
                        <img className="logoTik mx-auto" src={logoTik} alt="TikTak"/>
            </Link>
                    <span className="nav-tool-items mr-2 text-right" >

                    <Link to="/Registro">
                        <PersonAdd/>
                    </Link>

                    <Link to="/Login">
                        <Input/>
                    </Link> 

            
                   
                    <Link to="/myProfile">
                        <h5>{<Translate string={this.state.userName}/>}</h5>
                    </Link> 
                  
            

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