import React, {Component} from 'react';


class Gotosections extends React.Component {  

    constructor(props) {
        super(props); 

        this.state= {
            class : "btn btn-rounded btn-outline-dark m-2",
            class2 : "btn btn-rounded btn-outline-info m-2",
            class3 : "btn btn-rounded  m-2 btn-outline-primary"
        }  
     
      

      }  


      componentDidMount() {
        
        if(this.props.setName=="private")
        this.setState({class:"btn btn-rounded btn-dark m-2"});
     
        if(this.props.setName=="publicintro")
        this.setState({class2:"btn btn-rounded btn-info m-2"});
    

        if(this.props.setName=="action")
        this.setState({class3:"btn btn-rounded  m-2 profile-action"});
    
    }


  render(){
      
      
    console.log(this.props.setName);
      return ( 
          <React.Fragment>
        <div class="text-center clinic-services mb-4 hidden-md hidden-lg">
        <span class="mb-2   border-dark">
            <a href="/privatesetting" class="text-dark">PRIVATE</a>
        </span>			 
        <span class="bg-primary  mb-2">
            <a href="/publicintro" class="text-white">PUBLIC</a></span>
            <span class="mb-2 border-danger">
                <a href="/profileaction" class="text-danger">ACTIONS</a>
            </span>	 
        </div>

        <div class="mt-5 psetingmb-5  text-center hidden-xs hidden-sm">
        <h6 class="text-center">Go to sections:</h6>
        <a href="/privatesetting"><button type="button" class={this.state.class}>PRIVATE</button></a>
        <a href="/publicintro"><button type="button" class={this.state.class2}>PUBLIC</button></a>
        <a href="/profileaction"><button type="button" class={this.state.class3}> ACTIONS</button></a>
        </div>
        </React.Fragment>

      )
  }
}

export default Gotosections;