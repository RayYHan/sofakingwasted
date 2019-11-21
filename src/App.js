import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

function App() {
  let storage = !firebase.apps.length
    ? firebase.initializeApp({
      storageBucket: "sofakingwasted-e795e.appspot.com",
      projectId: "sofakingwasted-e793e"
    }).storage()
    : firebase.app().storage();
  let shelf_img = storage.ref('assets/shelf.png').fullPath;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <img src={shelf_img} alt="shelf" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
