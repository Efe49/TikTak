import React, {
    Component
} from 'react'
import {
    ThumbDownAlt,
    ThumbUpAlt,
    CommentOutlined,
    Share
} from '@material-ui/icons'
import ComentariosList from './ComentariosList'
import comentarios_data from '../Files/comentarios.json'

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
            descripcion: this.props.Descripcion,
            meGusta: this.props.meGusta,
            noMeGusta: this.props.noMeGusta,
            creador: this.props.creador
        }
        this.handleOnLike = this.handleOnLike.bind(this)
        this.handleOnDisLike = this.handleOnDisLike.bind(this)

    }

    async componentDidMount() {
        this._isMounted = true;
        try {
            const fetchResponse = await fetch('http://localhost:3001/api/comentarios/' + this.props.id);
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

    async handleOnLike(e) {
        e.persist();
        let meGustaNuevo = this.state.meGusta + 1;

        var urlencoded = new URLSearchParams()
        urlencoded.append("meGusta", meGustaNuevo + "\n")
        /* urlencoded.append("password", usuario.password+"\n")
        urlencoded.append("userName", usuario.userName+"\n")
        urlencoded.append("name", usuario.name+"\n")
        urlencoded.append("email", usuario.email+"\n")
        urlencoded.append("seguidores", usuario.seguidores+"\n")
        urlencoded.append("seguidos", usuario.seguidos+"\n") */

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
        /* urlencoded.append("password", usuario.password+"\n")
        urlencoded.append("userName", usuario.userName+"\n")
        urlencoded.append("name", usuario.name+"\n")
        urlencoded.append("email", usuario.email+"\n")
        urlencoded.append("seguidores", usuario.seguidores+"\n")
        urlencoded.append("seguidos", usuario.seguidos+"\n") */

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
        return(
            <li key ={this.props.id} class="post-box card">
                <div class="align-self-center mx-auto">

                    <video class="post embed-responsive"  loop autoPlay muted  controls>
                        <source src={this.props.contenido} type="video/mp4"/>
                    </video>
                    
                    <div class="card-body">
                        <ul class="nav justify-content-between">
                            <li>
                                <div class ="col mx-auto">
                                    <a class="dislike mr-3"href="/" onClick={this.handleOnDisLike} >
                                    <ThumbDownAlt/> {this.state.noMeGusta}
                                    </a>
                                    <a class="like ml-4 mr-5 "href="/" onClick={this.handleOnLike}>
                                        <ThumbUpAlt/>{this.state.meGusta}
                                    </a>
                                </div>
                            </li>
                            <li>
                                <a href="https://github.com/" class="comment mx-auto">
                                    <CommentOutlined/>
                                </a>
                            </li>
                            <li> 
                                <a class ="share mx-auto" href="https://github.com/">
                                    <Share/>
                                </a>
                            </li>
                        </ul>
            
                        <a class="user mt-3 mb-2" href="https://github.com/">
                            <h2 class="card-author">{this.props.creador}</h2>
                        </a>       
                        <a class="title text-center" href="https://github.com/"> 
                            <h3 class="card-title">{this.props.titulo}</h3>
                        </a>
                        <p class="card-text">{this.props.descripcion}</p>

                        COMENTARIOS DESTACADOS
                   
                        <ComentariosList
                            publicacionID =  {this.props.id}
                            comentarios_data = {this.state.comentarios_data}    
                        />                            
                    </div>
                </div>
            </li>)
    }
}

Publicacion.propTypes = {}
Publicacion.defaultProps = {}