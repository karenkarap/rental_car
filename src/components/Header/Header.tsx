import css from './Header.module.css';

import Container from '../Container/Container';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';

const Header = () => {
  return (
    <header className={css.header}>
      <Container>
        <nav className={css.headerNav} aria-label="Main navigation">
          <Logo />
          <ul className={css.headerNavList}>
            <li className={css.headerNavListItem}>
              <NavLink
                className={({ isActive }) => (isActive ? css.headerNavListAccent : '')}
                to="/"
                end
              >
                Home
              </NavLink>
            </li>
            <li className={css.headerNavListItem}>
              <NavLink
                className={({ isActive }) => (isActive ? css.headerNavListAccent : '')}
                to="/catalog"
                end
              >
                Catalog
              </NavLink>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
