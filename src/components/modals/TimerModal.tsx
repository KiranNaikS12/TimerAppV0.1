import React, { useState, useEffect, useCallback } from 'react';
import { X, Clock } from 'lucide-react';
import { useTimerStore } from '../../store/useTimerStore';
import { validateTimerForm } from '../../utils/validation';
import { Timer } from '../../types/timer';
import Button from '../ui/Button';
import { toast } from 'sonner';

interface TimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  timer?: Timer; // Optional timer for edit mode
}


const TimerModal: React.FC<TimerModalProps> = ({ 
  isOpen, 
  onClose, 
  mode, 
  timer 
}) => {
  // Initialize state based on mode edit or add to make the component reusable..
  const [title, setTitle] = useState(mode === 'edit' && timer ? timer.title : '');
  const [description, setDescription] = useState(mode === 'edit' && timer ? timer.description : '');
  const [hours, setHours] = useState(
    mode === 'edit' && timer 
      ? Math.floor(timer.duration / 3600) 
      : 0
  );
  const [minutes, setMinutes] = useState(
    mode === 'edit' && timer 
      ? Math.floor((timer.duration % 3600) / 60) 
      : 0
  );
  const [seconds, setSeconds] = useState(
    mode === 'edit' && timer 
      ? timer.duration % 60 
      : 0
  );
  const [touched, setTouched] = useState({
    title: false,
    hours: false,
    minutes: false,
    seconds: false,
  });

  const { addTimer, editTimer } = useTimerStore();

  useEffect(() => {
    if (isOpen) {
      // Reset to initial state or timer values
      setTitle(mode === 'edit' && timer ? timer.title : '');
      setDescription(mode === 'edit' && timer ? timer.description : '');
      setHours(mode === 'edit' && timer ? Math.floor(timer.duration / 3600) : 0);
      setMinutes(mode === 'edit' && timer ? Math.floor((timer.duration % 3600) / 60) : 0);
      setSeconds(mode === 'edit' && timer ? timer.duration % 60 : 0);
      setTouched({
        title: false,
        hours: false,
        minutes: false,
        seconds: false,
      });
    }
  }, [isOpen, mode, timer]);

  const handleClose = useCallback(() => {
    onClose();
    setTouched({
      title: false,
      hours: false,
      minutes: false,
      seconds: false,
    });
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateTimerForm({ title, description, hours, minutes, seconds })) {
      return;
    }

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    // Here, we call based on add or edit instead of calling seprately..
    if (mode === 'add') {
      addTimer({
        title: title.trim(),
        description: description.trim(),
        duration: totalSeconds,
        remainingTime: totalSeconds,
        isRunning: false,
      });
      toast.success("Timer added successfully!");
    } else {
      // Edit mode
      if (!timer) return;
      editTimer(timer.id, {
        title: title.trim(),
        description: description.trim(),
        duration: totalSeconds,
      });
      toast.success("Timer updated successfully!");
    }

    onClose();
  };

  const isTimeValid = hours > 0 || minutes > 0 || seconds > 0;
  const isTitleValid = title.trim().length > 0 && title.length <= 50;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold">
              {mode === 'add' ? 'Add New Timer' : 'Edit Timer'}
            </h2>
          </div>
          
          <Button 
            onClick={handleClose} 
            title='Close' 
            className="p-1 transition-colors rounded-full hover:bg-gray-100"
            icon={<X className="w-5 h-5" />}
          />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setTouched({ ...touched, title: true })}
              maxLength={50}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                touched.title && !isTitleValid
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              placeholder="Enter timer title"
            />
            {touched.title && !isTitleValid && (
              <p className="mt-1 text-sm text-red-500">
                Title is required and must be less than 50 characters
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              {title.length}/50 characters
            </p>
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter timer description (optional)"
            />
          </div>
          
          <div>
            <label className="block mb-3 text-sm font-medium text-gray-700">
              Duration <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block mb-1 text-sm text-gray-600">Hours</label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={hours}
                  onChange={(e) => setHours(Math.min(23, parseInt(e.target.value) || 0))}
                  onBlur={() => setTouched({ ...touched, hours: true })}
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-600">Minutes</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) => setMinutes(Math.min(59, parseInt(e.target.value) || 0))}
                  onBlur={() => setTouched({ ...touched, minutes: true })}
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-600">Seconds</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={seconds}
                  onChange={(e) => setSeconds(Math.min(59, parseInt(e.target.value) || 0))}
                  onBlur={() => setTouched({ ...touched, seconds: true })}
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            {touched.hours && touched.minutes && touched.seconds && !isTimeValid && (
              <p className="mt-2 text-sm text-red-500">
                Please set a duration greater than 0
              </p>
            )}
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button 
              onClick={handleClose}
              type="button"
              title="Cancel"
              label="Cancel"
              className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
            />
            
            <Button 
              type="submit"
              title={mode === 'add' ? 'Submit' : 'Save'}
              label={mode === 'add' ? "Add Timer" : "Save Changes"}
              className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(TimerModal);