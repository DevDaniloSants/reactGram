// Styles
import styles from './RootLayout.module.css';

import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <>
      <header></header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};

export default RootLayout;
