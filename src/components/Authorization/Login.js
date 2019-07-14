import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {
  
  constructor(props) {
    super(props);
    this.updateLoginInput = this.updateLoginInput.bind(this);
    this.login = this.login.bind(this);
    this.state = {
      loginInput: '',
      error: '',
      isLoading: false
    }
  }

  updateLoginInput(e) {
    this.setState({
      loginInput: e.target.value
    })
  }

  async login(e) {
    e.preventDefault();

    try {

      this.setState({isLoading: true});

      const user = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${e.target.userId.value}`
      );

      if (!user) {
        return this.setState({error: 'user not found'});
      } 

      localStorage.setItem('userId', user.data._id);
      this.props.updateUserId(user.data._id);
      this.props.toggleAuth();
    } 
    catch (error) {
      this.setState({error: 'user not found'});
      console.error(error);
    }

    this.setState({isLoading: false});
  }

  render() {

    return (
      <div className="login-screen">
        <h1>Login</h1>
        <p>Enter your user ID to log in and manage your tasks.</p>
        <form onSubmit={this.login}>
          <input 
            name="userId" 
            type="text" 
            placeholder="user ID"
            autoComplete="off"
            spellCheck="false"
            onChange={this.updateLoginInput}
            value={this.state.loginInput}
          >
          </input>
          {
            this.state.isLoading 
            ?
            <div className="loading"></div>
            :
            <button disabled={!this.state.loginInput} >
              Log In
            </button>
          }
        </form>
        {
          this.state.error &&
          <p className="error">
            {this.state.error}
          </p> 
        }
        <p className="toggle-form">
          Don't have an account?
          <span onClick={this.props.toggleSignupForm}> Sign up</span>
        </p>
      </div>
    );
  }
};