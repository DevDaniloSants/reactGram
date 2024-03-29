import styles from './Auth.module.css';

// Components
import { Link } from 'react-router-dom';
import Message from '../../components/Message/Message';

// Hooks
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';

// Redux
import { register, reset } from '../../slices/authSlice';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const { auth, redirectUserNotFound, loading: loadingAuth } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    dispatch(register(user));
  };

  // clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  // check if user is auth
  useEffect(() => {
    if (auth) {
      redirectUserNotFound();
    }
  }, [auth]);

  // if user is auth
  if (loadingAuth) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.register}>
      <h2>Reactgram</h2>
      <p className={styles.subtitle}>
        Cadastre-se para ver as fotos dos seus amigos.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="email"
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
        <input
          type="password"
          placeholder="Confirme a senha"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        {!loading && <input type="submit" value="Cadastrar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type={'error'} />}
      </form>
      <p>
        Já tem conta ? <Link to="/login">Clique Aqui</Link>
      </p>
    </div>
  );
};

export default Register;
