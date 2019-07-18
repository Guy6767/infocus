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
        <div className="task-overview">
          <div class="text">
            <h1 className="title">{overviewedTask.title}</h1>
            <h2 className="subtitle">{overviewedTask.subtitle}</h2>
            <p className="description">{overviewedTask.description}</p>
          </div>

          <div className="task-player-container">
            <TaskPlayer 
              setActiveTask={this.props.setActiveTask} 
              stopActiveTask={this.props.stopActiveTask}
              task={overviewedTask}
              isPlaying={this.props.activeTask._id === this.props.overviewedTask._id}
             />
          </div>

          <div className="progress-bars">
            <TaskProgressBar type='daily' task={overviewedTask} />
            <TaskProgressBar type='weekly' task={overviewedTask} />
          </div>
        </div>
      </main>
    );
  }
}



