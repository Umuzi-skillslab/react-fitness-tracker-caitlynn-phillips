import { useState, useEffect } from 'react';
import SearchBar from '../components/UI/SearchBar';
import ExerciseFilter from '../components/Exercise/ExerciseFilter';
import ExerciseList from '../components/Exercise/ExerciseList';
import styles from './Pages.module.css';

const ExercisesPage = ({ exercises, plannedIds, onSelectExercise, onAddToWorkout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || exercise.category === category;
    const matchesDifficulty = difficulty === 'all' || exercise.difficulty === difficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleClearFilters = () => {
    setCategory('all');
    setDifficulty('all');
  };

  return (
    <div className={styles.exercisesPage}>
      <h1>Browse Exercises</h1>
      <SearchBar onSearch={setSearchTerm} placeholder="Search by exercise name..." />
      <ExerciseFilter
        category={category}
        difficulty={difficulty}
        onCategoryChange={setCategory}
        onDifficultyChange={setDifficulty}
        onClear={handleClearFilters}
      />
      <ExerciseList
        exercises={filteredExercises}
        isLoading={isLoading}
        plannedIds={plannedIds}
        onSelectExercise={onSelectExercise}
        onAddToWorkout={onAddToWorkout}
      />
    </div>
  );
};

export default ExercisesPage;