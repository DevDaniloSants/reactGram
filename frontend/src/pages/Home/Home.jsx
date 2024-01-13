// styles
import styles from './Home.module.css';

import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { auth, loading } = useAuth();
  const navigate = useNavigate();

  console.log(auth);

  if (loading) {
    return <p>Carregando...</p>;
  }
  return <div>Home</div>;
};

export default Home;
