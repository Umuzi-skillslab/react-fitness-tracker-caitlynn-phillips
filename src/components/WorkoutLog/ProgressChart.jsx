import PropTypes from 'prop-types';
import styles from './WorkoutLog.module.css';

// Simple bar-style visual summary of workout stats — no external chart library needed
const ProgressChart = ({ workoutHistory, workoutPlan }) => {
  // Total exercises currently planned across the week
  const totalPlanned = Object.values(workoutPlan).reduce(
    (sum, dayExercises) => sum + dayExercises.length,
    0
  );

  // Total workouts logged, and a rough estimate of calories burned
  const totalWorkouts = workoutHistory.length;
  const totalSets = workoutHistory.reduce((sum, w) => sum + w.sets, 0);

  const stats = [
    { label: 'Workouts Logged', value: totalWorkouts, max: 20 },
    { label: 'Exercises Planned', value: totalPlanned, max: 20 },
    { label: 'Total Sets Completed', value: totalSets, max: 100 },
  ];

  return (
    <div className={styles.progressChart}>
      {stats.map((stat) => (
        <div key={stat.label} className={styles.progressRow}>
          <span>{stat.label}</span>
          <div className={styles.progressBarTrack}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${Math.min((stat.value / stat.max) * 100, 100)}%` }}
            />
          </div>
          <span>{stat.value}</span>
        </div>
      ))}
    </div>
  );
};

ProgressChart.propTypes = {
  workoutHistory: PropTypes.array.isRequired,
  workoutPlan: PropTypes.object.isRequired,
};

export default ProgressChart;