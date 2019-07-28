import React from 'react';
import CounterMessage from './CounterMessage';

const TaskProgressBar = props => {

  const task = props.task;

  const percentage = 100 * (task.dailyCounter / task.dailyGoal);

  return (
    <div className="progress-bars">
      <div className="bar">
        <div className="progress" style={{width: (percentage > 1 ? percentage : 0) + '%'}}></div>
      </div>
      <div className="progress-text">
        <p>DAILY GOAL - </p>
        <CounterMessage className={"time"} task={task} />
      </div>
    </div>
  );
};

export default TaskProgressBar;


