import ProgressChart from '../components/WorkoutLog/ProgressChart';
import styles from './Pages.module.css';

// Page wrapper showing overall progress stats
const ProgressPage = ({ workoutHistory, workoutPlan }) => {
  return (
    <div className={styles.progressPage}>
      <h1>Your Progress</h1>
      <ProgressChart workoutHistory={workoutHistory} workoutPlan={workoutPlan} />
    </div>
  );
};

export default ProgressPage;