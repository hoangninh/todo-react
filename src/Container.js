import React,{Component} from 'react';
import Menu from './components/menu'
import App from './App'
export default class Container extends Component{
  render(){
    return(
      <div className="todo?">
          <Menu />
          <App />
      </div>
    );
  }
}
