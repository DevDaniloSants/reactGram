// styles
import styles from './Auth.module.css';

import { Link } from 'react-router-dom';

// hooks
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Redux

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { auth, redirect, loading } = useAuth();

  useEffect(() => {
    if (auth) {
      redirect();
    }
  }, [auth]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    console.log(user);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.login}>
      <h2>ReactGram</h2>
      <p className={styles.subtitle}>Faça o login para ver o que há de novo</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input type="submit" value={'Entrar'} />
      </form>
      <p>
        Não tem uma conta ? <Link to="/register">Clique Aqui</Link>
      </p>
    </div>
  );
};

export default Login;
