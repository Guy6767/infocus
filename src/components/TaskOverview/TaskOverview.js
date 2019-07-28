import React from 'react';
import TaskProgressBar from '../Utils/TaskProgressBar';
import TaskPlayer from '../Utils/TaskPlayer';

export default class TaskOverview extends React.Component {

  render() {

    const overviewedTask = this.props.overviewedTask;

    return (
      <main 
        className="task-overview-container"
        style={{backgroundImage: `url(${overviewedTask.imageURL})`}}
      > 
      {
        this.props.overviewedTask 
        ?
        <div className="task-overview">
          <div className="text">
            <h1 className="title">{overviewedTask.title}</h1>
            <h2 className="subtitle">{overviewedTask.subtitle}</h2>
            <p className="description">{overviewedTask.description}</p>
          </div>
          {
          !(overviewedTask.weekendOff && (new Date().getDay() === 6 || new Date().getDay() === 7)) &&
          <div className="task-player-container">
            <TaskPlayer 
              playTask={this.props.playTask} 
              pauseTask={this.props.pauseTask}
              task={overviewedTask}
              isPlaying={this.props.activeTaskId === this.props.overviewedTask._id}
             />
          </div>
          }
          {
          !(overviewedTask.weekendOff && (new Date().getDay() === 6 || new Date().getDay() === 7)) &&
          <div className="progress-bars">
            <TaskProgressBar task={overviewedTask} />
          </div>
          }
        </div>
        :
        <div className="task-overview">
          <div className="text">
            <h1 className="title">Welcome</h1>
            <h2 className="subtitle">Choose a task you want to focus on or create a new one.</h2>
          </div>
        </div>
      }
      </main>
    );
  }
}



