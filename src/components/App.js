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
     this.playTask = this.playTask.bind(this);
     this.pauseTask = this.pauseTask.bind(this);
     this.focus = this.focus.bind(this);

     this.state = {
       userId: '',
       authorized: false,
       tasks: [],
       overviewedTask: '',
       activeTaskId: '',
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

    setInterval(() => this.focus(), 1000);
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

  playTask(taskId) {
    this.setState({activeTaskId: taskId});
    this.focus();
  }

  pauseTask() {
    this.setState({activeTaskId: ''});
  }

  focus() {

    if (!this.state.activeTaskId) return;
    
    console.log('focusing...');

    const tasks = this.state.tasks.map(task => {
      if (task._id === this.state.activeTaskId) {
        task.dailyCounter += 1;
        task.weeklyCounter += 1;
      }
      return task;
    });
    this.setState({tasks: tasks});

    /*
      TODO: 
      send a patch request to increment the task 
      dailyCounter / weeklyCounter. try sending request 
      for only counters that are  divideable by ten. this way 
      youll send a request every ten seconds.
    */
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
              playTask={this.playTask} 
              activeTaskId={this.state.activeTaskId}
              pauseTask={this.pauseTask}
            />
          }
        </div>
      </div>
    );
  }
}

