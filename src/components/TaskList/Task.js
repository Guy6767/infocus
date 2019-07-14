import React from 'react';

const Task = props => {

    return (
      <div className="task">
        <h2 className="title">{props.task.title}</h2>
        <p className="subtitle">{props.task.subtitle || props.task.title}</p>
        <p className="time-left">{props.task.dailyGoalMins} MIN LEFT</p>
      </div>
    );
};

export default Task;