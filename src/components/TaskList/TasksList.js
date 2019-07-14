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
    this.state = {
      tasks: [],
      filteredTasks: [],
      search: '',
      onAddTaskForm: true
    }
  }

  async componentDidMount() {
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
    this.setState(prevState => ({onAddTaskForm: !prevState.onAddTaskForm}));
  }

  render() {

    return (
      <div>
        {
          this.state.onAddTaskForm
          ?
          <AddTaskForm 
            toggleAddTaskForm={this.toggleAddTaskForm} 
          />
          :
          <div className="tasks-list">
          <TaskListToolbar 
            updateSearchInput={this.updateSearchInput}
            toggleAddTaskForm={this.toggleAddTaskForm} 
            search={this.state.search} 
          />
          {
            this.state.filteredTasks.map(task => 
              <Task task={task} key={task.title} />
            )
          }
          </div>
        }
      </div>
    );
  }
};