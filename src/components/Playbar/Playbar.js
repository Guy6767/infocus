import React from 'react';
import ProfileStatus from './ProfileStatus';
import TaskProgressBar from '../Utils/TaskProgressBar';
import TaskPlayer from '../Utils/TaskPlayer';

const Playbar = props => {

  let activeTask = props.tasks.filter(task => task._id === props.activeTaskId)[0];
  if (!activeTask) {
    activeTask = props.tasks.filter(task => task._id === props.lastActiveTaskId)[0];
  }

  return (
    <div className="playbar">
      <ProfileStatus userId={props.userId} />
      { activeTask && <p className="task-title">{activeTask.title}</p> }
      { activeTask && <TaskProgressBar type='daily' task={activeTask} /> } 
      { activeTask &&
         <TaskPlayer
            playTask={props.playTask} 
            pauseTask={props.pauseTask}
            task={activeTask}
            isPlaying={props.activeTaskId}
         /> 
      }
    </div>
  );
};

export default Playbar;