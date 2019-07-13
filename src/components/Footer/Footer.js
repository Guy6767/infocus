import React from 'react';
import ProfileStatus from './ProfileStatus';

export default class App extends React.Component {

  render() {

    return (
     <footer>
      <ProfileStatus userId={this.props.userId} />
     </footer>
    );
  }
}