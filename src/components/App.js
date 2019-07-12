import React from 'react';
import Login from './Login';

export default class App extends React.Component {

  constructor(props) {
     super(props);
     this.state = {
       userId: localStorage.getItem('userId') || 1
     }
  }

  render() {

    return (
      <div id="app">
        <div className="app-container">
          <aside>
          {
            this.state.userId 
            ?
            <Login />
            :
            ''
          }
          </aside>
          <main>
          </main>
        </div>
        <footer></footer>
      </div>
    );
  }
}

