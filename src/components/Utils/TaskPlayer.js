import React from 'react';
import { ReactComponent as PlayIcon } from '../../assets/svg/play-solid.svg';
import { ReactComponent as PauseIcon } from '../../assets/svg/pause-solid.svg';

const TaskPlayer = props => {

  const setActiveTask = () => {
    return props.setActiveTask(props.task);
  };

  const stopActiveTask = () => {
    return props.stopActiveTask();
  };

  return (
    <div 
      onClick={props.isPlaying ? stopActiveTask : setActiveTask} 
      className={'task-player' + (props.isPlaying ? ' pause' : ' play')}
    >
      {props.isPlaying ? <PauseIcon></PauseIcon> : <PlayIcon></PlayIcon> }
    </div>
  );
};

export default TaskPlayer;
