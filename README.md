
# Timer App- Overview
The Timer App allows users to set and manage multiple timers simultaneously, ensuring they stay punctual and organized. This app is particularly useful for day-to-day task management. It provides a responsive user interface, notification alerts, and persistence of timers across page refreshes.


# ************ PROJECT SETUP ************
1. Clone the repository:  git clone https://github.com/KiranNaikS12/TimerAppV0.1.git

2. Navigate to the project directory: cd timer

3. Install dependencies: npm install or yarn install

4. Start the development server: npm run dev

5. Open your browser and navigate to http://localhost:5173


# **************Features**************

# 1. Simultaneous Timers: 
Users can run multiple timers at once.

# 2. Snack Bar Notifications:
   Displays a notification when a timer completes.
   The notification sound continues playing until dismissed.

# 3. Error Handling: 
Fixed console errors related to snack bar dismiss actions.

# 4. Reusable Components:
   Extracted buttons in the Add/Edit Timer Modal into a separate reusable component.
   Replaced all instances of similar buttons across the app.
   
# 5. Optimized Modal Code: 
Used a single modal component for adding and editing timers to eliminate redundancy.

# 6. Validation Enhancements:
   Previously, the Submit button was disabled when the form was invalid.
   Now, an error snack bar appears when users attempt to submit invalid data.
   Shows an error snack bar or notification when the form is submitted with invalid data.

# 7. Responsive Snack Bar Placement:
   Displays in the top-right corner on desktop.
   Displays at the bottom of the screen on mobile devices.

# 8. Unit & Component Tests:


# 9. Timer Persistence: 
   Utilizes localStorage to maintain timers across page refreshes.



# ************** Additional Features and Enhancement**************
1. Introduced useMemo and useCallback to optimize rendering and prevent unnecessary re-renders.
2. Implemented a custom throttling hook (useThrottle) for performance improvements.
3. Created a reusable useToggle hook for boolean state management.
4. Navigation Enhancements: Ensured the navbar remains properly positioned when content exceeds the viewport height.
5. Refactored Folder Structure: Improved maintainability by restructuring files and components.
