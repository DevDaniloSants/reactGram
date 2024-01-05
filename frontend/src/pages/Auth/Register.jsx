import styles from './Auth.module.css';

// Components
import { Link } from 'react-router-dom';

// Hooks
import { useEffect, useState } from 'react';

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.register}>
      <h2>Reactgram</h2>
      <p className={styles.subtitle}>
        Cadastre-se para ver as fotos dos seus amigos.
      </p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" />
        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Senha" />
        <input type="password" placeholder="Confirme a Psenha" />
        <input type="submit" value="Cadastrar" />
      </form>
      <p>
        Já tem conta ? <Link to="/login">Clique Aqui</Link>
      </p>
    </div>
  );
};

export default Register;
