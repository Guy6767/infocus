import React from 'react';
import axios from 'axios';

export default class TaskList extends React.Component {

  constructor(props) {
    super(props);
    this.updateSearchInput = this.updateSearchInput.bind(this);
    this.state = {
      tasks: [],
      filteredTasks: [],
      search: ''
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

  render() {

    return (
      <div className="tasks-list">
      <div className="toolbar">
        <span className="add-task">+</span>
        <input 
          className="search"
          name="search" 
          type="text" 
          placeholder="Search"
          autoComplete="off"
          spellCheck="false"
          onChange={this.updateSearchInput}
          value={this.state.search}
        >
        </input>
        <p className="edit-tasks">Edit</p>
      </div>
      {
        this.state.filteredTasks.map(task => {
          return (
            <div 
              className="task"
              key={task}
            >
              <h2 className="title">{task.title}</h2>
              <p className="subtitle">{task.subtitle || ''}</p>
              <p className="time-left">{task.dailyGoalMins} MIN LEFT</p>
            </div>
          );
        })
      }
      </div>
    );
  }
};