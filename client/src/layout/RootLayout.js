import { Outlet } from 'react-router-dom';
import './rootLayout.css';
import Footer from '../components/root_components/Footer';
import Header from '../components/root_components/Header';

const RootLayout = ({ cookies, photo, removeCookies ,role}) => {
  return (
    <div className="root-layout">
      <Header cookies={cookies} photo={photo} removeCookies={removeCookies} role={role} />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
