import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Menu } from '../Menu';
import './Layout.scss';
import { Footer } from '../Footer/Footer';

export const Layout = () => {
  return (
    <div className="layout">
      <header className="layout__header">
        <Header />
      </header>

      <div className="layout__menu">
        <Menu />
      </div>

      <main className="layout__content">
        <Outlet />
      </main>

      <footer className="layout__footer">
        <Footer />
      </footer>
    </div>
  );
};
