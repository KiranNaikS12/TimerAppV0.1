import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { Timer } from '../types/timer';
import { loadTimers, saveTimers } from '../utils/localStorageUtils';


//Load timers from localStorage as initialValue
const initialState = {
  timers: loadTimers(),
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    addTimer: (state, action) => {
      state.timers.push({
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
      });
      saveTimers(state.timers)
    },
    deleteTimer: (state, action) => {
      state.timers = state.timers.filter((timer: Timer )=> timer.id !== action.payload);
      saveTimers(state.timers);
    },
    toggleTimer: (state, action) => {
      const timer = state.timers.find((timer: Timer )=> timer.id === action.payload);
      if (timer) {
        timer.isRunning = !timer.isRunning;
        saveTimers(state.timers);
      }
    },
    // Updates all active timers together
    updateTimer: (state) => {
      state.timers.forEach((timer: Timer) => {
          if(timer.isRunning && timer.remainingTime > 0) {
            timer.remainingTime -= 1;
            timer.isRunning = timer.remainingTime > 0;
          }
      })
      saveTimers(state.timers)
    },
    restartTimer: (state, action) => {
      const timer = state.timers.find((timer: Timer) => timer.id === action.payload);
      if (timer) {
        timer.remainingTime = timer.duration;
        timer.isRunning = false;
        saveTimers(state.timers);
      }
    },
    editTimer: (state, action) => {
      const timer = state.timers.find((timer: Timer) => timer.id === action.payload.id);
      if (timer) {
        Object.assign(timer, action.payload.updates);
        timer.remainingTime = action.payload.updates.duration || timer.duration;
        timer.isRunning = false;
        saveTimers(state.timers);
      }
    },
  },
});

const store = configureStore({
  reducer: timerSlice.reducer,
});

export { store };

export const {
  addTimer,
  deleteTimer,
  toggleTimer,
  updateTimer,
  restartTimer,
  editTimer,
} = timerSlice.actions;

export const useTimerStore = () => {
  const dispatch = useDispatch();
  const timers = useSelector((state: { timers: Timer[] }) => state.timers);

  return {
    timers,
    addTimer: (timer: Omit<Timer, 'id' | 'createdAt'>) => dispatch(addTimer(timer)),
    deleteTimer: (id: string) => dispatch(deleteTimer(id)),
    toggleTimer: (id: string) => dispatch(toggleTimer(id)),
    updateTimer: () => dispatch(updateTimer()),
    restartTimer: (id: string) => dispatch(restartTimer(id)),
    editTimer: (id: string, updates: Partial<Timer>) => dispatch(editTimer({ id, updates })),
  };
};