import React, {Component} from 'react';

export default class TEST extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
      <p>  My name is {this.props.username} </p>  
      </div>
    )
  }
}
