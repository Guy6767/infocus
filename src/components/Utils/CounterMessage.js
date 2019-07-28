import React from 'react';

const CounterMessage = props => {

  const task = props.task;
  const remainingSeconds = task.dailyGoal - task.dailyCounter;

  const { hours, minutes } = secondsParser(remainingSeconds);

  return (
    <div className={props.className}>
      {hours > 0 && <p>{hours} HR </p>}
      {minutes > 0 && <p>{minutes} MIN </p>}
      {minutes === 0 && hours === 0 ? <p>FINISHED!</p> : <p>LEFT</p>}
    </div>
  );
};

const secondsParser = seconds => {

  let minutes = 0;
  while (seconds > 0) {
    seconds -= 60;
    minutes++;
  }

  let hours = 0;
  while (minutes >= 60) {
    minutes -= 60;
    hours++;
  }
  
  return {hours, minutes}
};

export default CounterMessage;