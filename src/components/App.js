import React from 'react';
import Authorization from './Authorization/Authorization';
import TaskList from './TaskList/TasksList';
import TaskOverview from './TaskOverview/TaskOverview';
import axios from 'axios';

export default class App extends React.Component {

  constructor(props) {
     super(props);
     this.toggleAuth = this.toggleAuth.bind(this);  
     this.updateUserId = this.updateUserId.bind(this);
     this.loadTasks = this.loadTasks.bind(this);
     this.setOverviewedTask = this.setOverviewedTask.bind(this);
     this.setActiveTask = this.setActiveTask.bind(this);

     this.state = {
       userId: '',
       authorized: false,
       tasks: [],
       overviewedTask: '',
       activeTask: '',
       loadingTasks: false,
       welcomeMessage: false
     }
  }

  componentDidMount() {

    const userId = localStorage.getItem('userId');
    if (userId) {
      this.setState({userId});
      this.setState({authorized: true});
    }  
  }

  async loadTasks() {
    this.setState({loadingTasks: true});

    try {
      const user = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${this.state.userId}`
      );
      this.setState({tasks: user.data.tasks});
    } 
    catch (error) {
      console.error(error);
    }
    this.setState({loadingTasks: false});

    if (this.state.tasks.length === 0) {
      return this.setState({welcomeMessage: true});
    }
    this.setState({welcomeMessage: false});
  }

  toggleAuth() {
    this.setState(prevState => ({authorized: !prevState.authorized}));
  }

  updateUserId(userId) {
    this.setState({userId});
  }

  setOverviewedTask(task) {
    this.setState({overviewedTask: task});
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
              setOverviewedTask={this.setOverviewedTask}
              loadTasks={this.loadTasks}
              tasks={this.state.tasks}
              loadingTasks={this.state.loadingTasks}
              welcomeMessage={this.state.welcomeMessage}
            />
            :
            <Authorization 
              toggleAuth={this.toggleAuth} 
              updateUserId={this.updateUserId} 
            />
          }
          </aside>
          {
            this.state.overviewedTask &&
            <TaskOverview 
              overviewedTask={this.state.overviewedTask}
              setActiveTask={this.setActiveTask} 
              activeTask={this.state.activeTask}
              stopActiveTask={this.stopActiveTask}
            />
          }
        </div>
      </div>
    );
  }
}

