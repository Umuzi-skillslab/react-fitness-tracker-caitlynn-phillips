import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import Modal from './components/UI/Modal';
import ExerciseDetail from './components/Exercise/ExerciseDetail';
import Home from './pages/Home';
import ExercisesPage from './pages/ExercisesPage';
import ExerciseDetailPage from './pages/ExerciseDetailPage';
import WorkoutPlannerPage from './pages/WorkoutPlannerPage';
import HistoryPage from './pages/HistoryPage';
import ProgressPage from './pages/ProgressPage';
import NotFound from './pages/NotFound';
import { exercisesData } from './data/exercisesData';
import useLocalStorage from './utils/useLocalStorage';
import './App.css';

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const emptyPlan = daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: [] }), {});

function App() {
  const [exercises, setExercises] = useState([]);
  const [workoutPlan, setWorkoutPlan] = useLocalStorage('workoutPlan', emptyPlan);
  const [workoutHistory, setWorkoutHistory] = useLocalStorage('workoutHistory', []);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Load exercise data on mount
  useEffect(() => {
    setExercises(exercisesData);
  }, []);

  // Maps JS's getDay() (0 = Sunday) onto our Monday-first daysOfWeek array
  const getTodayName = () => daysOfWeek[(new Date().getDay() + 6) % 7];

  // Adds an exercise to today's day in the plan, avoiding duplicates
  const handleAddToWorkout = (exercise) => {
    const today = getTodayName();
    setWorkoutPlan((prev) => {
      const alreadyThere = prev[today].some((e) => e.id === exercise.id);
      if (alreadyThere) return prev;
      return { ...prev, [today]: [...prev[today], exercise] };
    });
  };

  const handleRemoveExercise = (day, exerciseId) => {
    setWorkoutPlan((prev) => ({
      ...prev,
      [day]: prev[day].filter((e) => e.id !== exerciseId),
    }));
  };

  const handleClearDay = (day) => {
    setWorkoutPlan((prev) => ({ ...prev, [day]: [] }));
  };

  const handleSelectExercise = (id) => {
    const exercise = exercises.find((e) => e.id === id);
    setSelectedExercise(exercise);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedExercise(null);
  };

  const handleLogWorkout = (workout) => {
    setWorkoutHistory((prev) => [...prev, workout]);
  };

  // Flatten the per-day plan into a single list of planned exercise ids
  const plannedIds = Object.values(workoutPlan).flat().map((e) => e.id);

  return (
    <BrowserRouter>
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                exercises={exercises}
                plannedIds={plannedIds}
                onSelectExercise={handleSelectExercise}
                onAddToWorkout={handleAddToWorkout}
              />
            }
          />
          <Route
            path="/exercises"
            element={
              <ExercisesPage
                exercises={exercises}
                plannedIds={plannedIds}
                onSelectExercise={handleSelectExercise}
                onAddToWorkout={handleAddToWorkout}
              />
            }
          />
          <Route
            path="/exercises/:id"
            element={
              <ExerciseDetailPage
                exercises={exercises}
                plannedIds={plannedIds}
                onAddToWorkout={handleAddToWorkout}
              />
            }
          />
          <Route
            path="/workout-planner"
            element={
              <WorkoutPlannerPage
                workoutPlan={workoutPlan}
                onRemoveExercise={handleRemoveExercise}
                onClearDay={handleClearDay}
              />
            }
          />
          <Route
            path="/history"
            element={
              <HistoryPage
                exercises={exercises}
                workoutHistory={workoutHistory}
                onLogWorkout={handleLogWorkout}
              />
            }
          />
          <Route
            path="/progress"
            element={<ProgressPage workoutHistory={workoutHistory} workoutPlan={workoutPlan} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <ExerciseDetail
          exercise={selectedExercise}
          isInPlan={selectedExercise ? plannedIds.includes(selectedExercise.id) : false}
          onAdd={handleAddToWorkout}
          onClose={handleCloseModal}
        />
      </Modal>
    </BrowserRouter>
  );
}

export default App;