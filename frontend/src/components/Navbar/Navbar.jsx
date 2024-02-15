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

// redux
import { logout, reset } from '../../slices/authSlice';

const Navbar = () => {
  // check if user is auth
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const [query, setQuery] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate('/login');
  };

  return (
    <nav className={styles.nav}>
      <Link to={'/'}>ReactGram</Link>
      <form className={styles.search_form} onSubmit={handleSearch}>
        <BsSearch />
        <input
          type="text"
          placeholder="Pesquisar"
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      <ul className={styles.nav_link}>
        {auth ? (
          <>
            <li>
              <Link to="/">
                <BsHouseDoorFill />
              </Link>
            </li>
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
              <span onClick={handleLogout}>Sair</span>
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
