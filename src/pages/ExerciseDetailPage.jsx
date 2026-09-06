import { useParams, useNavigate } from 'react-router-dom';
import ExerciseDetail from '../components/Exercise/ExerciseDetail';
import Button from '../components/UI/Button';
import styles from './Pages.module.css';

// Full-page exercise view, reached via the dynamic route /exercises/:id
const ExerciseDetailPage = ({ exercises, plannedIds, onAddToWorkout }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const exercise = exercises.find((e) => e.id === parseInt(id));
  const isInPlan = exercise ? plannedIds.includes(exercise.id) : false;

  return (
    <div className={styles.detailPage}>
      <div className={styles.detailNav}>
        <Button variant="secondary" onClick={() => navigate('/exercises')}>
          ← Back to Exercises
        </Button>
        <Button variant="secondary" onClick={() => navigate(`/exercises/${parseInt(id) - 1}`)}>
          Previous
        </Button>
        <Button variant="secondary" onClick={() => navigate(`/exercises/${parseInt(id) + 1}`)}>
          Next
        </Button>
      </div>
      <ExerciseDetail exercise={exercise} isInPlan={isInPlan} onAdd={onAddToWorkout} />
    </div>
  );
};

export default ExerciseDetailPage; 