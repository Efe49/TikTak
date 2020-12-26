class MyComponentStateful extends React.Component {

    constructor (...props){
        super(...props)
        this.state = {}
    }
    render () {
        return (<h1>Hello, {props.name}</h1>);
    }
}

const element = <Welcome name="Sara" />;

MyComponentStateful.propTypes = {String}
MyComponentStateful.defaultTypes = {String}

const MyComponentStateless = (...props) => {return (<h2>Farewell...</h2>);}