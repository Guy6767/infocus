import React from 'react';
import axios from 'axios';
import Task from './Task';
import TaskListToolbar from './TaskListToolbar';
import AddTaskForm from './AddTaskForm';

export default class TaskList extends React.Component {

  constructor(props) {
    super(props);
    this.updateSearchInput = this.updateSearchInput.bind(this);
    this.toggleAddTaskForm = this.toggleAddTaskForm.bind(this);
    this.loadTasks = this.loadTasks.bind(this);

    this.state = {
      tasks: [],
      filteredTasks: [],
      search: '',
      onAddTaskForm: false,
      isLoading: false,
      welcomeMessage: false
    }
  }

  componentDidMount() {
    this.loadTasks();
  } 

  async loadTasks() {
    this.setState({isLoading: true});

    const userId = this.props.userId;

    try {
      const user = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${userId}`
      );
      this.setState({
        tasks: user.data.tasks,
        filteredTasks: user.data.tasks
      });
    } 
    catch (error) {
      console.error(error);
    }
    this.setState({isLoading: false});

    if (this.state.tasks.length === 0) {
      return this.setState({welcomeMessage: true});
    }
    this.setState({welcomeMessage: false});
  }

  updateSearchInput(e) {
    const search =  e.target.value;
    this.setState({search});
    if (!search) this.setState({filteredTasks: this.state.tasks});
    const filteredTasks = this.state.tasks.filter(task => {
      return (task.title + task.subtitle).includes(search);
    });
    this.setState({filteredTasks});
  }

  toggleAddTaskForm() {
    this.setState({onAddTaskForm: !this.state.onAddTaskForm});
  }

  render() {

    return (
      <div>
        {
          this.state.onAddTaskForm
          ?
          <AddTaskForm 
            toggleAddTaskForm={this.toggleAddTaskForm} 
            userId={this.props.userId}
            loadTasks={this.loadTasks}
          />
          :
          <div className="tasks-list">
            <TaskListToolbar 
              updateSearchInput={this.updateSearchInput}
              toggleAddTaskForm={this.toggleAddTaskForm} 
              search={this.state.search} 
            />
            {
              this.state.isLoading
              ?
              <div className="loading"></div>
              :
              this.state.filteredTasks.map(task => 
                <Task 
                  task={task}
                  key={task._id}
                  setActiveTask={this.props.setActiveTask}
                />
              ).reverse()
            }
            {
            this.state.welcomeMessage &&
            <div className="welcome-message">
              <h1>Welcome</h1>
              <p>Click the add button to add a new task</p>
            </div>
            }
          </div>
        }
      </div>
    );
  }
};