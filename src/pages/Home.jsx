import { Link } from 'react-router-dom';
import ExerciseCard from '../components/Exercise/ExerciseCard';
import AudioPlayer from '../components/Media/AudioPlayer';
import Button from '../components/UI/Button';
import styles from './Pages.module.css';

// Landing page — hero section, a few featured exercises, and motivation audio
const Home = ({ exercises, workoutPlan, onSelectExercise, onAddToWorkout }) => {
  // Show only the first 3 exercises as a "featured" preview
  const featuredExercises = exercises.slice(0, 3);

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <h1>Track Your Fitness Journey</h1>
        <p>Browse exercises, plan your week, and log every workout.</p>
        <Link to="/exercises">
          <Button variant="primary">Browse Exercises</Button>
        </Link>
      </section>

      <AudioPlayer
        audioUrl="/assets/audio/motivation-track.mp3"
        title="Daily Motivation"
        description="Get pumped up before your workout."
      />

      <section>
        <h2>Featured Exercises</h2>
        <div className={styles.featuredGrid}>
          {featuredExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              isInPlan={workoutPlan.some((e) => e.id === exercise.id)}
              onSelect={onSelectExercise}
              onAdd={onAddToWorkout}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;