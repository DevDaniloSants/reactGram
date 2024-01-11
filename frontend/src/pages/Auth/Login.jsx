// styles
import styles from './Auth.module.css';

// hooks
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';

const Login = () => {
  const { auth, redirect, loading } = useAuth();

  useEffect(() => {
    if (auth) {
      redirect();
    }
  }, [auth]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return <div className={styles.login}>Login</div>;
};

export default Login;
