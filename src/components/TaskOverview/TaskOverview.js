import React from 'react';
import DailyProgressBar from './DailyProgressBar';

export default class TaskOverview extends React.Component {

  render() {

    const task = this.props.task;

    return (
      <main className="task-overview-container" style={{backgroundImage: `url(${task.imageURL})`}}>
        <div className="task-overview">
          <h1 className="title">{task.title}</h1>
          <h2 className="subtitle">{task.subtitle}</h2>
          <DailyProgressBar task={task} />
        </div>
      </main>
    );
  }
}



