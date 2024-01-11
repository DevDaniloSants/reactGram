// styles
import styles from './Home.module.css';

import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { auth, redirect, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      redirect();
    } else {
      navigate('/login');
    }
  }, [auth]);

  if (loading) {
    return <p>Carregando...</p>;
  }
  return <div>Home</div>;
};

export default Home;
