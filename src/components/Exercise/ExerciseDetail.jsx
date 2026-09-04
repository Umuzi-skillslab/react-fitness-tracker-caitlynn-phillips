import PropTypes from 'prop-types';
import Badge from '../UI/Badge';
import Button from '../UI/Button';
import VideoPlayer from '../Media/VideoPlayer';
import styles from './Exercise.module.css';

// Full detail view for a single exercise, including video demo and instructions
const ExerciseDetail = ({ exercise = null, isInPlan = false, onAdd = () => {}, onClose = null }) => {
  // Guard clause — if no exercise was found/passed, show a fallback
  if (!exercise) {
    return <p>Exercise not found.</p>;
  }

  return (
    <div className={styles.detailContainer}>
      <div className={styles.detailHeader}>
        <h2>{exercise.name}</h2>
        <Badge text={exercise.difficulty} variant={exercise.difficulty} />
      </div>

      <VideoPlayer
        videoUrl={exercise.videoUrl}
        title={`${exercise.name} demonstration`}
        description="Watch proper form before attempting this exercise."
      />

      <p>
        {exercise.sets} sets × {exercise.reps} reps · {exercise.duration} minutes ·{' '}
        {exercise.caloriesBurn} cal
      </p>

      <h4>Instructions</h4>
      <ol>
        {exercise.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      <div className={styles.badgeRow}>
        {exercise.muscleGroups.map((muscle, index) => (
          <Badge key={index} text={muscle} />
        ))}
      </div>

      <div className={styles.detailActions}>
        <Button variant={isInPlan ? 'secondary' : 'primary'} onClick={() => onAdd(exercise)}>
          {isInPlan ? 'Added to Plan ✓' : 'Add to Workout Plan'}
        </Button>
        {onClose && (
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        )}
      </div>
    </div>
  );
};

ExerciseDetail.propTypes = {
  exercise: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    difficulty: PropTypes.string,
    videoUrl: PropTypes.string,
    sets: PropTypes.number,
    reps: PropTypes.number,
    duration: PropTypes.number,
    caloriesBurn: PropTypes.number,
    instructions: PropTypes.arrayOf(PropTypes.string),
    muscleGroups: PropTypes.arrayOf(PropTypes.string),
  }),
  isInPlan: PropTypes.bool,
  onAdd: PropTypes.func,
  onClose: PropTypes.func,
};

export default ExerciseDetail;