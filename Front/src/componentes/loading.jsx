import {Fragment, Component } from 'react'
import Loader from 'react-loader-spinner'

export default class Loading extends Component{
constructor(props){
 super (props)
}

render(){
  return (<Fragment className = "backgroundAPP" >
<body className = "backgroundAPP">
<div className="row h-100 w-100 ">
        <div className="col-sm-12 my-auto">
        <div className="card card-block w-25 mx-auto backgroundLoading">
        <div className ="mx-auto ">
      <Loader 
        type="TailSpin"
        color="#00BFFF"
        height={200}
        width={200}
      />

      </div>
      <div className = "mx-auto">
          <h2>{this.props.message}</h2>

      </div>
      <div className = "d-flex justify-content-center">
          <Loader type="ThreeDots" color="#FFFFF" height={80} width={80} />

      </div>
        </div>
     
    </div>
        </div>
    

</body>


    
  </Fragment>

  )
}
}