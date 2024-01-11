// styles
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

// icons
import {
  BsSearch,
  BsHouseDoorFill,
  BsCameraFill,
  BsFillPersonFill,
} from 'react-icons/bs';

// hooks
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  // check if user is auth
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  if (user) {
    console.log(user);
  }

  return (
    <nav className={styles.nav}>
      <Link to={'/'}>ReactGram</Link>
      <form className={styles.search_form}>
        <BsSearch />
        <input type="text" placeholder="Pesquisar" />
      </form>
      <ul className={styles.nav_link}>
        <li>
          <Link to="/">
            <BsHouseDoorFill />
          </Link>
        </li>
        {auth ? (
          <>
            {user && (
              <li>
                <Link to={`/users/${user._id}`}>
                  <BsCameraFill />
                </Link>
              </li>
            )}
            <li>
              <Link to={`/profile`}>
                <BsFillPersonFill />
              </Link>
            </li>
            <li>
              <span>Sair</span>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Entrar</Link>
            </li>
            <li>
              <Link to="/register">Cadastrar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
