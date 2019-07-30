import React from 'react';
import { ReactComponent as PlayIcon } from '../../assets/svg/play-solid.svg';
import { ReactComponent as PauseIcon } from '../../assets/svg/pause-solid.svg';

const TaskPlayer = props => {

  const playTask = () => {
    return props.playTask(props.task._id);
  };

  const pauseTask = () => {
    return props.pauseTask();
  };

  // dont render the play button if the task is complete
  const className = (
    'task-player' + 
    (props.isPlaying ? ' pause' : ' play') +
    (props.task.dailyGoal === props.task.dailyCounter ? ' hidden' : '')
  ); 

  return (
    <div>
    { 
      <div onClick={props.isPlaying ? pauseTask : playTask} className={className}>
        {props.isPlaying ? <PauseIcon></PauseIcon> : <PlayIcon></PlayIcon> }
      </div>
    }
    </div>
  );
};

export default TaskPlayer;
