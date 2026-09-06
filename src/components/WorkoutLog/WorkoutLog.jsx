import { useState } from 'react';
import PropTypes from 'prop-types';
import LogEntry from './LogEntry';
import Button from '../UI/Button';
import styles from './WorkoutLog.module.css';

// Form for logging a completed workout, plus a list of past entries with validation
const WorkoutLog = ({ exercises, workoutHistory, onLogWorkout }) => {
  const [currentLog, setCurrentLog] = useState({
    exerciseId: '',
    sets: 0,
    reps: 0,
    weight: 0,
  });
  const [inputError, setInputError] = useState('');

  // Handle the log-workout form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentLog.exerciseId) {
      setInputError('Please select an exercise.');
      return;
    }

    const exercise = exercises.find((ex) => ex.id === Number(currentLog.exerciseId));
    if (!exercise) return;

    onLogWorkout({
      id: Date.now(),
      exerciseName: exercise.name,
      date: new Date().toLocaleDateString(),
      sets: Number(currentLog.sets),
      reps: Number(currentLog.reps),
      weight: Number(currentLog.weight),
    });

    // Reset the form after logging
    setCurrentLog({ exerciseId: '', sets: 0, reps: 0, weight: 0 });
    setInputError('');
  };

  // Validate fields on blur event
  const handleInputBlur = (field, value) => {
    if (value < 0) {
      setInputError(`${field} cannot be negative.`);
    } else {
      setInputError('');
    }
  };

  return (
    <div className={styles.workoutLog}>
      {inputError && (
        <div style={{ color: '#dc2626', marginBottom: '0.75rem', fontWeight: 600 }}>
          {inputError}
        </div>
      )}
      <form onSubmit={handleSubmit} className={styles.logForm}>
        <select
          value={currentLog.exerciseId}
          onChange={(e) => setCurrentLog({ ...currentLog, exerciseId: e.target.value })}
          required
        >
          <option value="">Select exercise...</option>
          {exercises.map((exercise) => (
            <option key={exercise.id} value={exercise.id}>
              {exercise.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Sets"
          value={currentLog.sets}
          onChange={(e) => setCurrentLog({ ...currentLog, sets: e.target.value })}
          onBlur={(e) => handleInputBlur('Sets', Number(e.target.value))}
          min="0"
        />
        <input
          type="number"
          placeholder="Reps"
          value={currentLog.reps}
          onChange={(e) => setCurrentLog({ ...currentLog, reps: e.target.value })}
          onBlur={(e) => handleInputBlur('Reps', Number(e.target.value))}
          min="0"
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={currentLog.weight}
          onChange={(e) => setCurrentLog({ ...currentLog, weight: e.target.value })}
          onBlur={(e) => handleInputBlur('Weight', Number(e.target.value))}
          min="0"
        />
        <Button type="submit">Log Workout</Button>
      </form>

      <div className={styles.historyList}>
        {workoutHistory.length > 0 ? (
          workoutHistory.map((workout) => <LogEntry key={workout.id} workout={workout} />)
        ) : (
          <p className={styles.emptyDay}>No workouts logged yet. Start tracking your progress!</p>
        )}
      </div>
    </div>
  );
};

WorkoutLog.propTypes = {
  exercises: PropTypes.array.isRequired,
  workoutHistory: PropTypes.array.isRequired,
  onLogWorkout: PropTypes.func.isRequired,
};

export default WorkoutLog;