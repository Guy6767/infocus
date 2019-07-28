import React from 'react';
import Authorization from './Authorization/Authorization';
import TaskList from './TaskList/TasksList';
import TaskOverview from './TaskOverview/TaskOverview';
import Playbar from './Playbar/Playbar';
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
       lastActiveTaskId: '',
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
    localStorage.setItem('overviewedTask', JSON.stringify(task));
  }

  playTask(taskId) {
    this.setState({activeTaskId: taskId});
    this.setState({lastActiveTaskId: taskId});        
  }

  pauseTask() {
    this.setState({activeTaskId: ''});
  }

  focus() {

    if (!this.state.activeTaskId) return;

    // currently playing task and its properties
    const activeTask = this.state.tasks.filter(task => task._id === this.state.activeTaskId)[0];
    const { dailyGoal, dailyCounter } = activeTask;

    // daily goal ✅ , pause the task (no updates)
    if (dailyCounter === dailyGoal) {
      return this.pauseTask();
    } 

    const tasks = updateClientCounter(this.state);
    this.setState({tasks: tasks});

    updateServerCounters(this.state, dailyCounter);
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

          <TaskOverview 
            overviewedTask={this.state.overviewedTask}
            playTask={this.playTask} 
            activeTaskId={this.state.activeTaskId}
            pauseTask={this.pauseTask}
          />
         
        </div>
          <Playbar 
            userId={this.state.userId} 
            tasks={this.state.tasks} 
            activeTaskId={this.state.activeTaskId} 
            lastActiveTaskId={this.state.lastActiveTaskId}
            playTask={this.playTask} 
            pauseTask={this.pauseTask}
          />
      </div>
    );
  }
}

const updateClientCounter = state => {

  const tasks = state.tasks.map(task => {
    if (task._id === state.activeTaskId) {
      task.dailyCounter += 1;
    }
    return task;
  });
  return tasks;
};

const updateServerCounters = async (state, dailyCounter) => {

  // continue with the update every 10 seconds
  if (dailyCounter % 10 !== 0) return;

  try {
    await axios.patch(
      `${process.env.REACT_APP_API_URL}/tasks/update/${state.activeTaskId}`,
      {
        owner: state.userId,
        updates: { dailyCounter }
      }
    );
  } catch (error) {
    console.error(error);
  }
};

