import React, {
    Component
} from 'react'
import {
    ThumbDownAlt,
    ThumbUpAlt,
    CommentOutlined,
    Share
    
} from '@material-ui/icons'


import {getPublicacion} from '../Services/Api'
import {Link} from 'react-router-dom'
import ComentariosList from './ComentariosList'
import comentarios_data from '../Files/comentarios.json'
import Loading from './loading'
import {getUserLogged } from '../Services/Api'
import DeleteIcon from '@material-ui/icons/Delete';
import {deletePublicacion } from '../Services/Api'

export default class Publicacion extends Component {
    _isMounted = false;
    constructor(...props) {
        super(...props)

        this.state = {
            comentarios_data,
            _id: this.props._id,
            id: this.props.id,
            contenido: this.props.contenido,
            titulo: this.props.titulo,
            descripcion: this.props.descripcion,
            meGusta: this.props.meGusta,
            noMeGusta: this.props.noMeGusta,
            creador: this.props.creador,
            userLogged : null
        }
        this.handleOnLike = this.handleOnLike.bind(this)
        this.handleOnDisLike = this.handleOnDisLike.bind(this)
        this.handleOnDelete = this.handleOnDelete.bind(this)
    }

    async componentDidMount() {
        
        if(this.props.match){
            const _id = this.props.match.params.publicacion
            const publicacionData = await getPublicacion({_id})
            this.setState({
                _id: publicacionData._id,
                id: publicacionData.id,
                contenido: publicacionData.contenido,
                titulo: publicacionData.titulo,
                descripcion: publicacionData.Descripcion,
                meGusta: publicacionData.meGusta,
                noMeGusta: publicacionData.noMeGusta,
                creador: publicacionData.creador
            })
        }
        const user =  await getUserLogged()
        this.setState({
            userLogged : user.userName
        })
        this._isMounted = true;
        try {
            const fetchResponse = await fetch('http://localhost:3001/api/comentarios/' + this.state.id);
            const data = await fetchResponse.json();
            if (this._isMounted) {
                this.setState({
                    comentarios_data: data
                })

            }
        } catch (e) {
            return e;
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    async handleOnDelete(){
        const identificadorPost = this.state._id
        try{
            await deletePublicacion({identificadorPost})
        }catch(error){
            throw error
        }
        
            
        
    
    }
    async handleOnLike(e) {
        e.persist();
        let meGustaNuevo = this.state.meGusta + 1;

        var urlencoded = new URLSearchParams()
        urlencoded.append("meGusta", meGustaNuevo + "\n")

        const requestOptions = {
            method: 'put',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem('token')
            },
            body: urlencoded
        };
        fetch('http://localhost:3001/api/Publicaciones/' + this.state._id, requestOptions)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                this.setState({
                    meGusta: meGustaNuevo
                })
            })
        e.preventDefault()
    }
    async handleOnDisLike(e) {
        e.persist();
        let nomeGustaNuevo = this.state.noMeGusta + 1;

        var urlencoded = new URLSearchParams()
        urlencoded.append("meGusta", nomeGustaNuevo + "\n")


        const requestOptions = {
            method: 'put',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem('token')
            },
            body: urlencoded
        };
        fetch('http://localhost:3001/api/Publicaciones/' + this.state._id, requestOptions)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                this.setState({
                    noMeGusta : nomeGustaNuevo
                })
            })
        e.preventDefault()
    }
    render(){
        if(this._isMounted && (this.state.creador === this.state.userLogged) ){

        
        return(
            <li key ={this.props.keyP} className="post-box card ">
                <div className="align-self-center mx-auto">

                    <video className="post embed-responsive"  loop autoPlay muted  controls>
                        <source src = {this.state.contenido} type="video/mp4"/>
                    </video>
                    
                    <div className="card-body">
                        <ul className="nav justify-content-between">
                            <li>
                                <div className="col mx-auto">
                                    <a className="dislike mr-3"href="/" onClick={this.handleOnDisLike} >
                                    <ThumbDownAlt/> {this.state.noMeGusta}
                                    </a>
                                    <a className="like ml-4 mr-5 "href="/" onClick={this.handleOnLike}>
                                        <ThumbUpAlt/>{this.state.meGusta}
                                    </a>
                                </div>
                            </li>
                            <li>
                                <a href="https://github.com/" className="comment mx-auto">
                                    <CommentOutlined/>
                                </a>
                            </li>
                            <li> 
                                <a className="share mx-auto" href="https://github.com/">
                                    <Share/>
                                </a>
                                <a className="dislike mr-3"href="/" onClick={this.handleOnDelete} >
                                <DeleteIcon></DeleteIcon>
                                            </a>
                               
                            </li>
                        </ul>
            
                    
                            <Link to={{pathname : `/Usuario/${this.state.creador}`,
                                        usuario : this.state.creador}}>
                            <h2 className="card-author">{this.state.creador}</h2>

                            </Link>
                         
                        <Link to={{pathname : `/Publicacion/${this.state._id}`,
                                    publicacion : this.state.publicacion }}>

                            <h3 className="card-title">{this.state.titulo}</h3>

                        </Link>
                       
                        <p className="card-text">{this.state.descripcion}</p>

                        COMENTARIOS DESTACADOS
                   
                        <ComentariosList
                            comentarios_data = {this.state.comentarios_data}    
                        />                            
                    </div>
                </div>
            </li>)
            }else if (this._isMounted){
                return(
                    <li key ={this.props.keyP} className="post-box card ">
                        <div className="align-self-center mx-auto">
        
                            <video className="post embed-responsive"  loop autoPlay muted  controls>
                                <source src = {this.state.contenido} type="video/mp4"/>
                            </video>
                            
                            <div className="card-body">
                                <ul className="nav justify-content-between">
                                    <li>
                                        <div className="col mx-auto">
                                            <a className="dislike mr-3"href="/" onClick={this.handleOnDisLike} >
                                            <ThumbDownAlt/> {this.state.noMeGusta}
                                            </a>
                                            <a className="like ml-4 mr-5 "href="/" onClick={this.handleOnLike}>
                                                <ThumbUpAlt/>{this.state.meGusta}
                                            </a>
                                        </div>
                                    </li>
                                    <li>
                                        <a href="https://github.com/" className="comment mx-auto">
                                            <CommentOutlined/>
                                        </a>
                                    </li>
                                    <li> 
                                        <a className="share mx-auto" href="https://github.com/">
                                            <Share/>
                                        </a>
                                    
                                    </li>
                                </ul>
                    
                            
                                    <Link to={{pathname : `/Usuario/${this.state.creador}`,
                                                usuario : this.state.creador}}>
                                    <h2 className="card-author">{this.state.creador}</h2>
        
                                    </Link>
                                 
                                <Link to={{pathname : `/Publicacion/${this.state._id}`,
                                            publicacion : this.state.publicacion }}>
        
                                    <h3 className="card-title">{this.state.titulo}</h3>
        
                                </Link>
                               
                                <p className="card-text">{this.state.descripcion}</p>
        
                                COMENTARIOS DESTACADOS
                           
                                <ComentariosList
                                    comentarios_data = {this.state.comentarios_data}    
                                />                            
                            </div>
                        </div>
                    </li>)
            }
            
            else{
                return(
                <Loading
                message="Cargando Publicacion"/>)
            }
    }
}

Publicacion.propTypes = {}
Publicacion.defaultProps = {}