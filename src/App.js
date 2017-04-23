import React, { Component } from 'react';
// import TEST from './components/test';
import * as firebase from 'firebase';
import './App.css';
import moment from 'moment';


export default class App extends Component {
  constructor(props){
    super(props);
    this._onChange=this._onChange.bind(this);
    this._onpress=this._onpress.bind(this);

    this.state={
      name:"",
      allwork:[

      ],
      time:""
    }
  }

  componentWillMount(){
    firebase.database().ref('todoapp/').on('value',(snapshot)=>{
      let alltodo=snapshot.val();
      console.log(">>>>",alltodo);
      if (!alltodo.map){
        alltodo = Object.keys(alltodo).map((key,index)=>alltodo[key])
      }
      if(alltodo!=null){
        this.setState({
            allwork:alltodo
        })
      }
    })

  }



  _onChange(event){
      this.setState({
        name:event.target.value,
        time: moment().format("Do MMMM")
      })
  }
  _onpress(event){
      const updatetodo={
      id:this.state.allwork.length,
      work:this.state.name,
      times:this.state.time
    }
    firebase.database().ref('todoapp/'+updatetodo.id).set(updatetodo);
    var notes=this.refs.notes;
    notes.value ="";

  }
  _unhideform(event){
    var form=document.getElementById("form-input");
    form.style.display="block";
  }
  _hideform(event){
    var form=document.getElementById("form-input");
    form.style.display="none";

  }
  _deletedata(i){
    console.log(i);
    const deleltedata={
      id:null,
      work:null
    }
    firebase.database().ref('todoapp/'+i).set(deleltedata);
    // console.log(i)
    // var adaRef = firebase.database().ref('todoapp/'+i);
    // console.log(adaRef);
    // adaRef.remove()
    //   .then(function() {
    //     console.log("Remove succeeded.")
    //   })
    //   .catch(function(error) {
    //     console.log("Remove failed: " + error.message)
    //   });
  }




  render() {


    // console.log(this.state.allwork.length,this.state.allwork[2]);
    const currentList=this.state.allwork.map((workr,i)=>{

      if(workr.id=="0"){
        return;
      }
        else{
        console.log(i);
          return(
              <div className="row" key={i}>
                <div className="col-md-12 col-xs-12">
                  <li className="task-item " >
                    <table cellPadding="0" cellSpacing="0">
                      <tbody>
                        <tr>
                          <td>
                            <span>
                              <button className="delete" onClick={()=>this._deletedata(workr.id)}>
                                  <span className="glyphicon glyphicon-ok del"></span>
                              </button>
                            </span>
                          </td>
                          <td className="form-td" >
                            <div className="formBox">{workr.work}
                                <span className="times">{workr.times}</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </li>
                  </div>
              </div>
        )
      }
    })
    return (
      <div className="container todo">
        <div className="row">
          <div className="col-md-9 col-md-offset-1 col-xs-9 col-xs-offset-1 editor">
            <h2 className="view-header">Inbox</h2>
            <div className="items">
              <ul>
                  {currentList}
                <li className="form-input">
                <input className="input" ref="notes" onChange={this._onChange} placeholder="Something Todo..."></input>
                <button className="add" onClick={this._onpress}>Add</button>
                <button className="remove" onClick={this._hideform}>
                  Cancel
                  </button>
                </li>
              </ul>
              <div>
                <button className="add-todo" onClick={this._unhideform}>Add Task</button>
              </div>
            </div>
          </div>
        </div>
      </div>


        );
      }
    }
