import React from 'react';
import Login from './Login';
import Signup from './Signup';

export default class Authorization extends React.Component {

 constructor(props) {
    super(props);
    this.toggleSignupForm = this.toggleSignupForm.bind(this);
    this.state = {
      hasAccount: true
   }
 }

 toggleSignupForm() {
  this.setState(prevState => ({hasAccount: !prevState.hasAccount}));
 }

  render() {

    return (
      <div className="authorization">
      {
        this.state.hasAccount 
        ?
        <Login 
          toggleSignupForm={this.toggleSignupForm}
          toggleAuth={this.props.toggleAuth}
          updateUserId={this.props.updateUserId}
        />
        :
        <Signup 
          toggleSignupForm={this.toggleSignupForm}
          toggleAuth={this.props.toggleAuth}
          updateUserId={this.props.updateUserId}
        />
      }
      </div>
    );
  }
};