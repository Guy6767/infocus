import React from 'react';
import CounterMessage from '../Utils/CounterMessage';

const DailyProgressBar = props => {

  return (
    <div className="task-progress-bar">
      <div className="bar">
        <div className="progress" style={{width: props.percentage + '%'}}></div>
      </div>
      <CounterMessage className={"progress-text"} type='daily' task={props.task} />
    </div>
  );
};

export default DailyProgressBar;


