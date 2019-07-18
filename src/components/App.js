import React from 'react';
import Authorization from './Authorization/Authorization';
import TaskList from './TaskList/TasksList';
import TaskOverview from './TaskOverview/TaskOverview';

export default class App extends React.Component {

  constructor(props) {
     super(props);
     this.toggleAuth = this.toggleAuth.bind(this);  
     this.updateUserId = this.updateUserId.bind(this);
     this.setOverviewedTask = this.setOverviewedTask.bind(this);
     this.setActiveTask = this.setActiveTask.bind(this);
     this.stopActiveTask = this.stopActiveTask.bind(this);

     this.state = {
       userId: '',
       authorized: false,
       overviewedTask: '',
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

  setOverviewedTask(task) {
    this.setState({overviewedTask: task});
  }

  setActiveTask(task) {
    this.setState({activeTask: task});
  }

  stopActiveTask() {
    this.setState({activeTask: ''});
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

