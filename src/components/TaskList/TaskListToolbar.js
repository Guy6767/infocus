import React from 'react';

const TaskListToolbar = props => {

  return (
    <header className="toolbar">
      <input 
        className="search"
        name="search" 
        type="text" 
        placeholder="Search"
        autoComplete="off"
        spellCheck="false"
        onChange={props.updateSearchInput}
        value={props.search}
      >
      </input>
      <span 
        className="add-task"
        onClick={props.toggleAddTaskForm}
      >
        +
      </span>
    </header>
  );
};

export default TaskListToolbar;