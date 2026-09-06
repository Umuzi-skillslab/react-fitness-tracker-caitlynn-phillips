import WorkoutLog from '../components/WorkoutLog/WorkoutLog';
import styles from './Pages.module.css';

// Page wrapper for logging workouts and viewing history
const HistoryPage = ({ exercises, workoutHistory, onLogWorkout }) => {
  return (
    <div className={styles.historyPage}>
      <h1>Workout History</h1>
      <WorkoutLog
        exercises={exercises}
        workoutHistory={workoutHistory}
        onLogWorkout={onLogWorkout}
      />
    </div>
  );
};

export default HistoryPage;