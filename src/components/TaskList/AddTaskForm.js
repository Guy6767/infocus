import React from 'react';
import AddTaskFormToolbar from './AddTaskFormToolbar';

class AddTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.updateInputFields = this.updateInputFields.bind(this);
    this.state = {
      titleInput: '',
      dailyGoalHours: '',
      dailyGoalMinutes: '30'
    };
  }

  updateInputFields(e) {
    switch (e.target.name) {
      case 'title':
        this.setState({title: e.target.value});
        break;
      case 'hours':
        if (e.target.value.length > 2 ) return;
        this.setState({dailyGoalHours: e.target.value});
        break;
      default:
        if (e.target.value.length > 2 ) return;
        this.setState({dailyGoalMinutes: e.target.value});
    }
  }

  render() {

    return (
      <div className="add-task-form">
        <AddTaskFormToolbar 
          toggleAddTaskForm={this.props.toggleAddTaskForm}
          title={this.state.title} 
        />
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
          ></input>

          <div className="daily-goal">
            <h1>DAILY GOAL</h1>
            <div className="digits">
              <input 
                className="hours"
                name="hours"
                type="text"
                placeholder="00"
                onChange={this.updateInputFields}
                value={this.state.dailyGoalHours}
              >
              </input>
              <span>:</span>
              <input 
                className="minutes"
                name="minutes"
                type="text"
                placeholder="00"
                onChange={this.updateInputFields}
                value={this.state.dailyGoalMinutes}
              >
              </input>
            </div>
            <div className="digits-preview">
              {this.state.dailyGoalHours && <p>{this.state.dailyGoalHours} HR</p>}
              {this.state.dailyGoalMinutes && <p> {this.state.dailyGoalMinutes} MIN</p>}
            </div>
          </div>
        </form>
      </div>
    );
  }
};

export default AddTaskForm;