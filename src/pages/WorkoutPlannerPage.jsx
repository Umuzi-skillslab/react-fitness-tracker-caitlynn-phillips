import WorkoutPlanner from '../components/WorkoutPlanner/WorkoutPlanner';
import styles from './Pages.module.css';

// Page wrapper for the weekly workout planner
const WorkoutPlannerPage = ({ workoutPlan, onRemoveExercise, onClearDay }) => {
  // Count total exercises currently planned across the week
  const totalPlanned = Object.values(workoutPlan).reduce(
    (sum, dayExercises) => sum + dayExercises.length,
    0
  );

  return (
    <div className={styles.plannerPage}>
      <h1>Workout Planner</h1>
      <p>{totalPlanned} exercises planned this week</p>
      <WorkoutPlanner
        workoutPlan={workoutPlan}
        onRemoveExercise={onRemoveExercise}
        onClearDay={onClearDay}
      />
    </div>
  );
};

export default WorkoutPlannerPage;