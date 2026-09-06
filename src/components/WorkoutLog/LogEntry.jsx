import PropTypes from 'prop-types';
import styles from './WorkoutLog.module.css';

// Displays one completed workout entry — reusable within WorkoutLog
const LogEntry = ({ workout }) => {
  return (
    <div className={styles.logEntry}>
      <div>
        <h4>{workout.exerciseName}</h4>
        <p>{workout.date}</p>
      </div>
      <div className={styles.logStats}>
        <span>{workout.sets} sets</span>
        <span>{workout.reps} reps</span>
        {workout.weight > 0 && <span>{workout.weight} kg</span>}
      </div>
    </div>
  );
};

LogEntry.propTypes = {
  workout: PropTypes.shape({
    id: PropTypes.number.isRequired,
    exerciseName: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    sets: PropTypes.number,
    reps: PropTypes.number,
    weight: PropTypes.number,
  }).isRequired,
};

export default LogEntry;