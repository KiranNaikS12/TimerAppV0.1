import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Trash2, RotateCcw, Pencil } from 'lucide-react';
import { Timer } from '../../types/timer';
import { formatTime } from '../../utils/time';
import { useTimerStore } from '../../store/useTimerStore';
import { toast } from 'sonner';
import { TimerAudio } from '../../utils/audio';
import { TimerControls } from './TimerControls';
import  TimerProgress  from './TimerProgress';
import Button from '../ui/Button';
import TimerModal from '../modals/TimerModal';

interface TimerItemProps {
  timer: Timer;
}

export const TimerItem: React.FC<TimerItemProps> = ({ timer }) => {
  const { toggleTimer, deleteTimer, updateTimer, restartTimer } = useTimerStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);
  const timerAudio = TimerAudio.getInstance();
  const hasEndedRef = useRef<boolean>(false);


  useEffect(() => {
    if (timer.isRunning) {
      intervalRef.current = window.setInterval(() => {
        updateTimer(); // Ensuring Multiple timers run together without passing timer.id
        
        if (timer.remainingTime <= 1 && !hasEndedRef.current) {
          hasEndedRef.current = true;
          timerAudio.play().catch(console.error);
          // Used .bind to maintain 'this' context, ensuring stop method correctly references TimerAudio instance   
          toast.success(`Timer "${timer.title}" has ended!`, {
            duration: Infinity, //set to infinity for manual dismiss.
            action: {
              label: 'Dismiss',
              onClick: timerAudio.stop.bind(timerAudio),
            },
          });
        }
      }, 1000);
    }

    return () => clearInterval(intervalRef.current!);
  }, [timer.isRunning, timer.id, timer.remainingTime, timer.title, timerAudio, updateTimer]);

  
  const handleRestart = useCallback(() => {
    hasEndedRef.current = false;
    restartTimer(timer.id);
  },[timer.id, restartTimer]);

  
  const handleDelete = useCallback(() => {
    timerAudio.stop();
    deleteTimer(timer.id);
  },[timer.id, timerAudio, deleteTimer]);

  
  const handleToggle = useCallback(() => {
    if (timer.remainingTime <= 0) {
      hasEndedRef.current = false;
    }
    toggleTimer(timer.id);
  },[timer.id, timer.remainingTime, toggleTimer]);

  
  // Handle timer edit modal
  const handleEditToggle = useCallback(() => {
    setIsEditModalOpen((prev) => !prev)
  },[])

  return (
    <>
      <div className="relative p-6 overflow-hidden transition-transform bg-white shadow-lg rounded-xl hover:scale-102">
        <div className="absolute inset-0 w-full h-full -z-10 opacity-5">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" />
            <path
              d="M50 20V50L70 70"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{timer.title}</h3>
              <p className="mt-1 text-gray-600">{timer.description}</p>
            </div>
            <div className="flex gap-2">

              {/* Open the edit modal */}
              <Button 
                onClick={handleEditToggle}
                title='Edit Timer'
                className="p-2 text-blue-500 transition-colors rounded-full hover:bg-blue-50"
                icon={<Pencil className="w-5 h-5" />}
              />
              
              {/* Restart the timer and reset the flag to false*/}
              <Button 
                onClick={handleRestart}
                title='Restart Timer'
                className="p-2 text-blue-500 transition-colors rounded-full hover:bg-blue-50"
                icon={<RotateCcw className="w-5 h-5" />}
              />
              
              {/* Delete the timer */}
              <Button 
                onClick={handleDelete} 
                title="Delete Timer"
                className="p-2 text-red-500 transition-colors rounded-full hover:bg-red-50"
                icon={ <Trash2 className="w-5 h-5" />}
              />
              
            </div>
          </div>
          <div className="flex flex-col items-center mt-6">
            <div className="mb-4 font-mono text-4xl font-bold text-gray-800">
              {formatTime(timer.remainingTime)} 
            </div>
            
            <TimerProgress
              progress={(timer.remainingTime / timer.duration) * 100}
            />
            
            <TimerControls
              isRunning={timer.isRunning}
              remainingTime={timer.remainingTime}
              onToggle={handleToggle}
              onRestart={handleRestart}
            />
          </div>
        </div>
      </div>

      <TimerModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        timer={timer}
        mode="edit"
      />
    </>
  );
};