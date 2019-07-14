import React from 'react';

const AddTaskFormToolbar = props => {

  return (
    <header className="toolbar">
      <div
        className="cancel"
        onClick={props.toggleAddTaskForm}
      >
        Cancel
      </div>
      <button 
        className="add-task" 
        disabled={!props.title}
        onClick={props.addTask}
      >
        Add
      </button>
    </header>
  );
};

export default AddTaskFormToolbar;