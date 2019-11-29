import React from 'react';
import './App.css';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: '',
      shelf_img: '',
      whiskeys: {},
    };
  }

  componentDidMount() {
    firebase.initializeApp({
      storageBucket: "sofakingwasted-e795e.appspot.com",
      projectId: "sofakingwasted-e795e",
      databaseURL: "sofakingwasted-e795e.firebaseio.com",
    });
    const storage = firebase.storage();
    const firestore = firebase.firestore();
    let whiskey_ref = firestore.collection('whiskeys')
    whiskey_ref.get().then( snapshot => {
      snapshot.forEach(doc => {
        let data = doc.data();
        storage.ref(`assets/whiskeys/${data['image']}`).getDownloadURL().then(res => {
          this.setState({
            whiskeys: {...this.state['whiskeys'], [doc.id]: {...data, img_url: res}}
          });
        });
      });
    }).catch( console.error );
    storage.ref('assets/logo.svg').getDownloadURL().then(res => {
      this.setState({ logo: res })
    });
    storage.ref('assets/shelf.png').getDownloadURL().then(res => {
      this.setState({ shelf_img: res });
    });
  }

  render() {
    const numbers = [1, 2, 3, 4, 5];
    const whiskey_data = Object.values(this.state['whiskeys'])
    whiskey_data.sort((w1, w2) => Object.values(w1['score']).reduce((s1, s2) => s1 + s2, 0) - Object.values(w2['score']).reduce((s1, s2) => s1 + s2, 0));
    const whiskeys = whiskey_data.map(whiskey => (
      <img className="whiskey" src={whiskey['img_url']} alt={whiskey['img_url']} />
    ))
    const shelfs = numbers.map(num => (
      [
        <div className="whiskeys">{whiskeys}</div>,
        <img src={this.state['shelf_img']} alt="shelf" id={'shelf' + num} />
      ]
    ));
    return (
      <div className="App">
        <header className="App-header">
          <img className="App-logo" src={this.state['logo']} alt={this.state['logo']} width="85" align="left"/>
        </header>
        <main className="App-main">
          {shelfs}
        </main>
      </div>
    );
  }
}

export default App;
