import PropTypes from 'prop-types';
import ExerciseCard from './ExerciseCard';
import Loading from '../UI/Loading';
import styles from './Exercise.module.css';

// Renders a grid of ExerciseCards, with loading and empty states handled
const ExerciseList = ({ exercises, isLoading, workoutPlan, onSelectExercise, onAddToWorkout }) => {
  if (isLoading) {
    return <Loading message="Loading exercises..." />;
  }

  if (exercises.length === 0) {
    return <p className={styles.emptyState}>No exercises found. Try a different filter.</p>;
  }

  return (
    <div className={styles.exerciseGrid}>
      {exercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          isInPlan={workoutPlan.some((e) => e.id === exercise.id)}
          onSelect={onSelectExercise}
          onAdd={onAddToWorkout}
        />
      ))}
    </div>
  );
};

ExerciseList.propTypes = {
  exercises: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  workoutPlan: PropTypes.array,
  onSelectExercise: PropTypes.func,
  onAddToWorkout: PropTypes.func,
};

ExerciseList.defaultProps = {
  isLoading: false,
  workoutPlan: [],
  onSelectExercise: () => {},
  onAddToWorkout: () => {},
};

export default ExerciseList;