import styles from './Navbar.module.css';

// components
import { Link } from 'react-router-dom';
import { BsSearch, BsHouseDoorFill } from 'react-icons/bs';

const Navbar = () => {
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
        <li>
          <Link to="/login">Entrar</Link>
        </li>
        <li>
          <Link to="/register">Cadastrar</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
