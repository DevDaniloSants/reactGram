// Router
import { Outlet } from 'react-router-dom';

// Components
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';

const RootLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default RootLayout;
