import React from 'react';
import AddTaskFormToolbar from './AddTaskFormToolbar';
import axios from 'axios';

class AddTaskForm extends React.Component {

  constructor(props) {
    super(props);
    this.updateInputFields = this.updateInputFields.bind(this);
    this.updateDailyGoal = this.updateDailyGoal.bind(this);
    this.formatDailyGoal = this.formatDailyGoal.bind(this);
    this.addTask = this.addTask.bind(this);

    this.state = {
      title: '',
      subtitle: '',
      dailyGoalHours: '',
      dailyGoalMinutes: '30',
      weekendOff: false,
      description: '',
      isLoading: false
    };
  }

  async addTask() {

    this.setState({isLoading: true});
    
    try {

      const hoursToMinutes = parseInt(this.state.dailyGoalHours.replace(/^0+/, '')) * 60 || 0;
      const minutes = (parseInt(this.state.dailyGoalMinutes.replace(/^0+/, '')) || 0) + hoursToMinutes;

      const image = await fetch(
        `https://source.unsplash.com/1600x900/?${this.state.title}`
      );

      await axios.post(
        `${process.env.REACT_APP_API_URL}/tasks/create`,
        {
          owner: this.props.userId,
          title: this.state.title,
          subtitle: this.state.subtitle,
          weekendOff: this.state.weekendOff,
          description: this.state.description,
          imageURL: image.url,
          dailyGoal: minutes * 60
        }
      );
    } 
    catch (error) {
      this.setState({error: 'the task was not added'});
      console.error(error);
    }

    this.props.toggleAddTaskForm();
    this.props.loadTasks();
    this.setState({isLoading: false});;
  }

  updateInputFields(e) {

    if (e.target.name === 'weekendOff') {
      return this.setState({weekendOff: !this.state.weekendOff})
    }
    this.setState({[e.target.name]: e.target.value});
  }

  updateDailyGoal(e) {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 2) return;

    if (e.target.name === 'hours') {
      if (value > 23) value = '23';
      return this.setState({dailyGoalHours: value});
    }
    if (value > 59) value = '59';
    this.setState({dailyGoalMinutes: value});
  }

  formatDailyGoal(e) {
    // format the digits from '1' to '01'
    const value = e.target.value.length < 2 ? '0' + e.target.value : e.target.value;

    if (e.target.name === 'hours') {
      return this.setState({dailyGoalHours: value});
    }
    this.setState({dailyGoalMinutes: value});
  }

  render() {

    return (
      <div className="add-task-form">
        <AddTaskFormToolbar 
          addTask={this.addTask}
          toggleAddTaskForm={this.props.toggleAddTaskForm}
          title={this.state.title} 
        />
        {
          this.state.isLoading 
          ?
          <div className="loading"></div>
          :
          <form spellCheck="false" autoComplete="off">
            <input 
              className="title"
              name="title" 
              type="text" 
              placeholder="Title"
              onChange={this.updateInputFields}
              value={this.state.title}
            ></input>

            <input 
              className="subtitle"
              name="subtitle" 
              type="text" 
              placeholder="Subtitle"
              onChange={this.updateInputFields}
              value={this.state.subtitle}
            ></input>

            <div className="daily-goal">
              <h1>DAILY GOAL</h1>
              <div className="digits">
                <input 
                  className="hours"
                  name="hours"
                  type="text"
                  placeholder="00"
                  onChange={this.updateDailyGoal}
                  onBlur={this.formatDailyGoal}
                  value={this.state.dailyGoalHours}
                ></input>
                <span>:</span>
                <input 
                  className="minutes"
                  name="minutes"
                  type="text"
                  placeholder="00"
                  onChange={this.updateDailyGoal}
                  onBlur={this.formatDailyGoal}
                  value={this.state.dailyGoalMinutes}
                ></input>
              </div>
              <div className="digits-preview">
                {this.state.dailyGoalHours.replace(/^0+/, '') && <p>{this.state.dailyGoalHours.replace(/^0+/, '')} HR</p>}
                {this.state.dailyGoalMinutes.replace(/^0+/, '') && <p> {this.state.dailyGoalMinutes.replace(/^0+/, '')} MIN</p>}
              </div>
            </div>

            <div className="weekend-off">
              <input
                name="weekendOff"
                type="checkbox"
                onChange={this.updateInputFields}
              ></input>
              <p className={this.state.weekendOff ? 'active' : ''}>
                take the weekend off
              </p>
            </div>

            <textarea
              className="task-description"
              name="description"
              type="text"
              placeholder="task description"
              onChange={this.updateInputFields}
              value={this.state.description}
            ></textarea>
          </form>
        }
        {this.state.error && <p className="error">{this.state.error}</p>}
      </div>
    );
  }
};

export default AddTaskForm;