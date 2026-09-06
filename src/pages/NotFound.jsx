import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button';
import styles from './Pages.module.css';

// Catch-all page shown for any route that doesn't match a defined path
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFound}>
      <h1>404</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Button onClick={() => navigate('/')}>Go Home</Button>
    </div>
  );
};

export default NotFound;