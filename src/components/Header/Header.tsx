import css from './Header.module.css';

import Container from '../Container/Container';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import { useFavoritesStore } from '../../store/favoritesStore';

const Header = () => {
  const { favorites } = useFavoritesStore();

  const isOpenFavorite = favorites.length > 0;

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

            {isOpenFavorite && (
              <li className={css.headerNavListItem}>
                <NavLink
                  className={({ isActive }) => (isActive ? css.headerNavListAccent : '')}
                  to="/favorites"
                  end
                >
                  Favorites
                  {favorites.length > 0 && <span className={css.badge}>{favorites.length}</span>}
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
