import React from 'react';
import CounterMessage from '../Utils/CounterMessage';

const Task = props => {

    const setOverviewedTask = () => {
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
        {
          props.task.weekendOff && (new Date().getDay() === 1 || new Date().getDay() === 7)
          ? 
          <p className="time-left">WEEKEND OFF</p>
          :
          <CounterMessage className={"time-left"} task={props.task} />
        }
      </div>
    );
};

export default Task;