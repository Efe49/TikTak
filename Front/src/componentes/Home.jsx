import {React, Component} from 'react'
import PublicacionesList from './PublicacionesList'


export default class Home extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            
        }
    }
    render(){
        return(
            <div>
                <PublicacionesList
                    publicaciones_data = {this.props.publicaciones_data}
                />
            </div>
        )
    }

}

Home.propTypes = {}
Home.defaultProps = {}
