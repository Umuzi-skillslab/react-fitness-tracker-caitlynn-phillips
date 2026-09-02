import PropTypes from 'prop-types';
import Card from '../UI/Card';
import Badge from '../UI/Badge';
import Button from '../UI/Button';
import styles from './Exercise.module.css';

// Displays a single exercise summary — used inside ExerciseList,
// the Home page featured section, and WorkoutPlanner's DayCard
const ExerciseCard = ({ exercise, isInPlan, onSelect, onAdd }) => {
  // Pick an emoji based on difficulty — a small data transformation
  // used directly inside JSX below
  const difficultyIcon =
    exercise.difficulty === 'beginner'
      ? '🟢'
      : exercise.difficulty === 'intermediate'
      ? '🟡'
      : '🔴';

  return (
    <Card>
      <div className={styles.cardHeader} onClick={() => onSelect(exercise.id)}>
        <h3>{exercise.name}</h3>
        <span>{difficultyIcon}</span>
      </div>
      <p>
        {exercise.sets} sets × {exercise.reps} reps · {exercise.duration} min
      </p>
      <div className={styles.badgeRow}>
        <Badge text={exercise.difficulty} variant={exercise.difficulty} />
        <Badge text={exercise.category} />
      </div>
      {exercise.muscleGroups.map((muscle, index) => (
        <span key={index} className={styles.muscleTag}>
          {muscle}
        </span>
      ))}
      <Button
        variant={isInPlan ? 'secondary' : 'primary'}
        onClick={() => onAdd(exercise)}
      >
        {isInPlan ? 'Added ✓' : 'Add to Plan'}
      </Button>
    </Card>
  );
};

ExerciseCard.propTypes = {
  exercise: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    muscleGroups: PropTypes.arrayOf(PropTypes.string),
    difficulty: PropTypes.string,
    duration: PropTypes.number,
    sets: PropTypes.number,
    reps: PropTypes.number,
  }).isRequired,
  isInPlan: PropTypes.bool,
  onSelect: PropTypes.func,
  onAdd: PropTypes.func,
};

ExerciseCard.defaultProps = {
  isInPlan: false,
  onSelect: () => {},
  onAdd: () => {},
};

export default ExerciseCard;