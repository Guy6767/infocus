import React from 'react';
import CounterMessage from '../Utils/CounterMessage';

const Task = props => {

    const setOverviewedTask = () => {
      console.log(props.task);
      props.setOverviewedTask(props.task);
    };

    const className = (
      props.task.dailyCounter >= props.task.dailyGoal ?
      'task finished' :
      'task'
    );

    return (
      <div className={className} onClick={setOverviewedTask} >
        <h2 className="title">{props.task.title}</h2>
        <p className="subtitle">{props.task.subtitle || props.task.title}</p>
        <CounterMessage className={"time-left"} type='daily' task={props.task} />
      </div>
    );
};

export default Task;