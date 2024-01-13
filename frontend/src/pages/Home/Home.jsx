// styles
import styles from './Home.module.css';

import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  // check if user is auth
  useEffect(() => {
    let userAuth = localStorage.getItem('user');
    if (userAuth) {
      return;
    } else {
      navigate('/login');
    }
  }, []);

  return <div>Home</div>;
};

export default Home;
