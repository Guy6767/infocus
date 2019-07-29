import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {
  
  constructor(props) {
    super(props);
    this.updateLoginInput = this.updateLoginInput.bind(this);
    this.login = this.login.bind(this);
    this.state = {
      email: '',
      password: '',
      error: '',
      isLoading: false
    }
  }

  updateLoginInput(e) {
    const { name, value } = e.target;
    if (name === 'email') {
      return this.setState({email: value});
    }
    this.setState({ password: value });
  }

  async login(e) {
    e.preventDefault();
    this.setState({isLoading: true});

    const { email, password } =  e.target;
    try {
      const user = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        { email: email.value, password: password.value }
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
        <p>Enter your email and password to log in and manage your tasks.</p>
        <form 
          onSubmit={this.login} 
          autoComplete="off"
          spellCheck="false"
        >
          <input 
            name="email" 
            type="email" 
            placeholder="email"
            onChange={this.updateLoginInput}
            value={this.state.email}>
          </input>
          <input 
            name="password" 
            type="password" 
            placeholder="password"
            onChange={this.updateLoginInput}
            value={this.state.password}>
          </input>
          {
            this.state.isLoading 
            ?
            <div className="loading"></div>
            :
            <button disabled={!(this.state.email && this.state.password)} >
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