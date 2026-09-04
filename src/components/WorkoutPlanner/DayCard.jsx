import PropTypes from 'prop-types';
import ExerciseCard from '../Exercise/ExerciseCard';
import Button from '../UI/Button';
import styles from './WorkoutPlanner.module.css';

// Represents a single day column in the weekly planner — reused 7 times
const DayCard = ({ day, exercises, onRemoveExercise, onClearDay }) => {
  return (
    <div className={styles.dayCard}>
      <div className={styles.dayHeader}>
        <h3>{day}</h3>
        {exercises.length > 0 && (
          <button className={styles.clearDayBtn} onClick={() => onClearDay(day)}>
            Clear Day
          </button>
        )}
      </div>

      {exercises.length === 0 ? (
        <p className={styles.emptyDay}>No exercises planned</p>
      ) : (
        exercises.map((exercise) => (
          <div key={exercise.id} className={styles.dayExercise}>
            <span>{exercise.name}</span>
            <Button variant="danger" onClick={() => onRemoveExercise(day, exercise.id)}>
              Remove
            </Button>
          </div>
        ))
      )}
    </div>
  );
};

DayCard.propTypes = {
  day: PropTypes.string.isRequired,
  exercises: PropTypes.array.isRequired,
  onRemoveExercise: PropTypes.func.isRequired,
  onClearDay: PropTypes.func.isRequired,
};

export default DayCard;