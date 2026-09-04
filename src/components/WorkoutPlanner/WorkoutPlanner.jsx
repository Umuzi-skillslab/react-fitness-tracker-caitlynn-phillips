import PropTypes from 'prop-types';
import DayCard from './DayCard';
import styles from './WorkoutPlanner.module.css';

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

// Renders the full weekly planner — one DayCard per day, reading from workoutPlan
const WorkoutPlanner = ({ workoutPlan, onRemoveExercise, onClearDay }) => {
  return (
    <div className={styles.plannerGrid}>
      {daysOfWeek.map((day) => (
        <DayCard
          key={day}
          day={day}
          exercises={workoutPlan[day]}
          onRemoveExercise={onRemoveExercise}
          onClearDay={onClearDay}
        />
      ))}
    </div>
  );
};

WorkoutPlanner.propTypes = {
  workoutPlan: PropTypes.object.isRequired,
  onRemoveExercise: PropTypes.func.isRequired,
  onClearDay: PropTypes.func.isRequired,
};

export default WorkoutPlanner;