export interface Timer {
  id: string;
  title: string;
  description: string;
  duration: number; // in seconds
  remainingTime: number;
  isRunning: boolean;
  createdAt: number;
}

export interface TimerControlsProps {
  isRunning: boolean;
  remainingTime: number;
  onToggle: () => void;
  onRestart: () => void;
}