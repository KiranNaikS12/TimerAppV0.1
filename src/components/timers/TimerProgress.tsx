import React from 'react';

interface TimerProgressProps {
  progress: number;
}

const TimerProgress: React.FC<TimerProgressProps> = ({ progress }) => (
  <div className="w-full h-2 mb-4 bg-gray-200 rounded-full">
    <div
      className="h-full transition-all duration-1000 bg-blue-600 rounded-full"
      style={{ width: `${progress}%` }}
    />
  </div>
);

export default React.memo(TimerProgress)