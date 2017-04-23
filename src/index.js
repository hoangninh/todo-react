import React from 'react';
import ReactDOM from 'react-dom';
import Container from './Container';
import './index.css';
import * as firebase from 'firebase';


var config = {
    apiKey: "AIzaSyAR9xCTFvUrnXlAbFg4nELlQo8Ax2YsdmY",
    authDomain: "todo-ceb21.firebaseapp.com",
    databaseURL: "https://todo-ceb21.firebaseio.com",
    storageBucket: "todo-ceb21.appspot.com",
    messagingSenderId: "654340218687"
  };
  firebase.initializeApp(config);

  ReactDOM.render(

    <Container/>,
    document.getElementById('root')
  );
