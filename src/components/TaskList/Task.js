import React from 'react';
import CounterMessage from '../Utils/CounterMessage';

const Task = props => {

    const setActiveTask = () => {
      console.log(props.task);
      props.setActiveTask(props.task);
    };

    return (
      <div className="task" onClick={setActiveTask} >
        <h2 className="title">{props.task.title}</h2>
        <p className="subtitle">{props.task.subtitle || props.task.title}</p>
        <CounterMessage className={"time-left"} type='daily' task={props.task} />
      </div>
    );
};

export default Task;