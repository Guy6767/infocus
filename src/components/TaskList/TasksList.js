import React from 'react';
import Task from './Task';
import TaskListToolbar from './TaskListToolbar';
import AddTaskForm from './AddTaskForm';

export default class TaskList extends React.Component {

  constructor(props) {
    super(props);
    this.updateSearchInput = this.updateSearchInput.bind(this);
    this.toggleAddTaskForm = this.toggleAddTaskForm.bind(this);

    this.state = {
      filteredTasks: [],
      search: '',
      onAddTaskForm: false
    }
  }

  componentDidMount() {
    this.props.loadTasks();
  }

  componentWillReceiveProps(newProps) {
    if (this.props.tasks.length !== newProps.tasks.length) {
      this.setState({filteredTasks: newProps.tasks})
    }
  }
  
  updateSearchInput(e) {
    const search =  e.target.value;
    this.setState({search});

    if (!search) this.setState({filteredTasks: this.props.tasks});
    
    const filteredTasks = this.props.tasks.filter(task => {
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
            loadTasks={this.props.loadTasks}
          />
          :
          <div className="tasks-list">
            <TaskListToolbar 
              updateSearchInput={this.updateSearchInput}
              toggleAddTaskForm={this.toggleAddTaskForm} 
              search={this.state.search} 
            />
            {
              this.props.loadingTasks
              ?
              <div className="loading"></div>
              :
              this.state.filteredTasks.map(task => 
                <Task 
                  task={task}
                  key={task._id}
                  setOverviewedTask={this.props.setOverviewedTask}
                />
              ).reverse()
            }
            {
            this.props.welcomeMessage &&
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