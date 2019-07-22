import React from 'react';
import Axios from 'axios';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      profileStatus: 'Anonymous'
    }
  }

  async componentDidUpdate() {
    const userId = this.props.userId;
    if (!userId) return;

    try {
      const user = await Axios.get(
        `${process.env.REACT_APP_API_URL}/users/${userId}`,
      );

      this.setState({profileStatus: user.data.username});
    } 
    catch (error) {
      console.error(error);
    }
  }

  render() {

    return (
     <div className="profile-status">
      <p>{this.state.profileStatus}</p>
     </div>
    );
  }
}