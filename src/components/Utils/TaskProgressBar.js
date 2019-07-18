import React from 'react';
import CounterMessage from './CounterMessage';

const TaskProgressBar = props => {

  const task = props.task;

  const percentage = (
    props.type === 'daily' ?
    100 * (task.dailyCounter / task.dailyGoal) :
    // type === 'weekly'
    100 * (task.weeklyCounter / (task.dailyGoal * (task.weekendOff ? 5 : 7)))
  );

  return (
    <div className="task-progress-bar">
      <div className="bar">
        <div className="progress" style={{width: percentage + '%'}}></div>
      </div>
      <div className="progress-text">
        <p>{props.type === 'daily' ? 'DAILY GOAL - ' : 'WEEKLY GOAL - '}</p>
        <CounterMessage className={"time"} type={props.type} task={task} />
      </div>
    </div>
  );
};

export default TaskProgressBar;


