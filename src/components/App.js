import React from 'react';
import Authorization from './Authorization/Authorization';
import TaskList from './TaskList/TasksList';
import TaskOverview from './TaskOverview/TaskOverview';
import Footer from './Footer/Footer';

export default class App extends React.Component {

  constructor(props) {
     super(props);
     this.toggleAuth = this.toggleAuth.bind(this);  
     this.updateUserId = this.updateUserId.bind(this);
     this.setActiveTask = this.setActiveTask.bind(this);

     this.state = {
       userId: '',
       authorized: false,
       activeTask: ''
     }
  }

  componentDidMount() {

    const userId = localStorage.getItem('userId');
    if (userId) {
      this.setState({userId});
      this.setState({authorized: true});
    }  
  }

  toggleAuth() {
    this.setState(prevState => ({authorized: !prevState.authorized}));
  }

  updateUserId(userId) {
    this.setState({userId});
  }

  setActiveTask(task) {
    this.setState({activeTask: task});
  }

  render() {

    return (
      <div id="app">
        <div className="app-container">
          <aside>
          {
            this.state.authorized 
            ?
            <TaskList 
              userId={this.state.userId}
              setActiveTask={this.setActiveTask}
              task={this.state.activeTask}
            />
            :
            <Authorization 
              toggleAuth={this.toggleAuth} 
              updateUserId={this.updateUserId} 
            />
          }
          </aside>
          {this.state.activeTask && <TaskOverview task={this.state.activeTask} />}
        </div>
        {/*<Footer userId={this.state.userId} />*/}
      </div>
    );
  }
}

