import {React, Component} from 'react'
import logoTik from '../Assets/logo.jpg'
import English from '../Assets/English.png'
import Spanish from '../Assets/Spanish.png'
import { Dropdown} from 'react-bootstrap'
import { AddAPhoto, Explore, PersonAdd, Input } from '@material-ui/icons'
import GTranslateOutlinedIcon from '@material-ui/icons/GTranslateOutlined';

import {Link} from 'react-router-dom'
import Translate from './Translate'

//traduccion
import { IntlProvider, FormattedMessage} from 'react-intl'

export default class Header extends Component{ 
     constructor(props){
        super(props)
        
        this.state = {}
    }

    render(){  

        return (
    <header>
        <nav className ="navbar headerTik justify-content-between mb-5">

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

            
                    <h5>
                        <h5><Translate string={"username"}/></h5>
                    </h5>
            

                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        <GTranslateOutlinedIcon/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item >
                                    <button id="en" onClick={this.props.changeLanguage}>  
                                        <img name ="en" src={English} className="img-fluid mx-auto " width="30" alt="Responsive image"/>
                            </button>
                        </Dropdown.Item>

                        <Dropdown.Item>
                                    <button id = "es" onClick={this.props.changeLanguage}> 
                                        <img name ="es" src={Spanish} className="img-fluid mx-auto " width="30" alt="Responsive image"/>
                            </button>
                        </Dropdown.Item>
                    </Dropdown.Menu>

                </Dropdown>              
                
            </span>
        </nav>
    </header>
        );
    }
}