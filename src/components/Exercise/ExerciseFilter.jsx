import PropTypes from 'prop-types';
import styles from './Exercise.module.css';

// Dropdown filters for category and difficulty, plus a clear-filters button
const ExerciseFilter = ({ category, difficulty, onCategoryChange, onDifficultyChange, onClear }) => {
  return (
    <div className={styles.filterBar}>
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className={styles.filterSelect}
      >
        <option value="all">All Categories</option>
        <option value="strength">Strength</option>
        <option value="cardio">Cardio</option>
        <option value="flexibility">Flexibility</option>
        <option value="balance">Balance</option>
      </select>

      <select
        value={difficulty}
        onChange={(e) => onDifficultyChange(e.target.value)}
        className={styles.filterSelect}
      >
        <option value="all">All Difficulties</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

      {(category !== 'all' || difficulty !== 'all') && (
        <button onClick={onClear} className={styles.clearFilters}>
          Clear Filters
        </button>
      )}
    </div>
  );
};

ExerciseFilter.propTypes = {
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onDifficultyChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default ExerciseFilter;