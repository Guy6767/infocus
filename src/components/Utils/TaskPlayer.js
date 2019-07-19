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

  return (
    <div 
      onClick={props.isPlaying ? pauseTask : playTask} 
      className={'task-player' + (props.isPlaying ? ' pause' : ' play')}
    >
      {props.isPlaying ? <PauseIcon></PauseIcon> : <PlayIcon></PlayIcon> }
    </div>
  );
};

export default TaskPlayer;
