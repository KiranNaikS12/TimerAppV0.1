import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import Button from '../ui/Button';
import { TimerControlsProps } from '../../types/timer';

const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  remainingTime,
  onToggle,
  onRestart,
}) => {
  const isCompleted = remainingTime <= 0;
  
  if (isCompleted) {
    return (
      
      <Button 
       onClick={onRestart}
       title="Restart Timer"
       className="p-3 text-blue-600 transition-colors bg-blue-100 rounded-full hover:bg-blue-200"
       icon={<RotateCcw className="w-6 h-6" />}
      />
    );
  }

  return (
    // Play button to start timer
    <Button
      onClick={onToggle}
      title={isRunning ? 'Pause Timer' : 'Start Timer'}
      className={`p-3 rounded-full transition-colors ${
        isRunning
          ? 'bg-red-100 text-red-600 hover:bg-red-200'
          : 'bg-green-100 text-green-600 hover:bg-green-200'
      }`}
      icon={isRunning ? (
        <Pause className="w-6 h-6" />
      ) : (
        <Play className="w-6 h-6" />
      )}
    />
  );
};

export default React.memo(TimerControls)