import { Timer } from "../types/timer";
const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY


// Function to retrieve timers from localStorage  
export const loadTimers = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error loading timers from localStorage:', error);
        return [];
    }
}

// Function to save the current timers state to localStorage  
export const saveTimers = (timers:Timer[]) => {
    try { 
        localStorage.setItem(STORAGE_KEY, JSON.stringify(timers))
    } catch (error) {
        console.error('Error saving timers to localStorage:', error);
    }
}