import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { navLinks } from '../../constants/navLinks';
import { GlobalContext } from '../../context/GlobalContext';
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FC,
} from 'react';
import { Icon } from '../Icon';
import { icons } from '../../constants/iconsObject';
import classNames from 'classnames';
import './Header.scss';
// eslint-disable-next-line import/no-extraneous-dependencies
import { debounce } from 'lodash';
import { getSearchWith } from '../../utils/searchHelper';

const getActiveItem = ({ isActive }: { isActive: boolean }) =>
  classNames('header__item', { 'header__item--active': isActive });

const getActiveIcon = ({ isActive }: { isActive: boolean }) =>
  classNames('header__icon', { 'header__icon--active': isActive });

const CATEGORY_ROUTES = ['phones', 'tablets', 'accessories'] as const;

export const Header: FC = () => {
  const {
    theme,
    toggleTheme,
    toggleMenu,
    isMenuOpen,
    favorites,
    cart,
    allProducts,
  } = useContext(GlobalContext);

  const [query, setQuery] = useState('');

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const isShowSearch = useMemo(
    () =>
      ['/phones', '/tablets', '/accessories', '/favorites'].includes(
        location.pathname,
      ),
    [location.pathname],
  );

  const applyQuery = useMemo(
    () =>
      debounce((value: string) => {
        const normalizedQuery = value.toLowerCase();

        const currentCategory = location.pathname.split('/')[1];

        const productsInCurrentCategory = allProducts.filter(
          p => p.category === currentCategory,
        );

        const hasResultsInCurrent = productsInCurrentCategory.some(p =>
          p.name.toLowerCase().includes(normalizedQuery),
        );

        if (hasResultsInCurrent) {
          setSearchParams(getSearchWith(searchParams, { query: value }));

          return;
        }

        for (const category of CATEGORY_ROUTES) {
          const hasResultsInOther = allProducts.some(
            p =>
              p.category === category &&
              p.name.toLowerCase().includes(normalizedQuery),
          );

          if (hasResultsInOther) {
            navigate(`/${category}?query=${encodeURIComponent(value)}`);

            return;
          }
        }

        setSearchParams(getSearchWith(searchParams, { query: value }));
      }, 500),
    [allProducts, location.pathname, navigate, searchParams, setSearchParams],
  );

  useEffect(() => {
    return () => applyQuery.cancel();
  }, [applyQuery]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newQuery = event.target.value.trim();

      setQuery(event.target.value);

      if (newQuery.length > 0) {
        applyQuery(event.target.value);
      } else {
        setSearchParams(prevParams => {
          const newParams = new URLSearchParams(prevParams);

          newParams.delete('query');

          return newParams;
        });
      }
    },
    [applyQuery, setSearchParams],
  );

  const clearInput = useCallback(() => {
    setQuery('');
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);

      newParams.delete('query');

      return newParams;
    });
  }, [setSearchParams]);

  const totalQuantity = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  return (
    <div className="header">
      <Link to="/" className="header__logo-container">
        <img
          src={theme === 'light' ? 'logo.svg' : 'logo_dark.svg'}
          alt="Nice Gadgets"
          className="header__logo"
        />
      </Link>
      <div className="header__menu">
        <div className="header__list">
          {navLinks.map(link => (
            <NavLink className={getActiveItem} to={link.path} key={link.title}>
              {link.title}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="header__buttons-right">
        {isShowSearch && (
          <div className="header__search-wrapper">
            <input
              type="text"
              placeholder="Search product..."
              className="header__search-input"
              value={query}
              onChange={handleInputChange}
            />
            {query ? (
              <div className="header__clear-button" onClick={clearInput}>
                <Icon icon={icons.close[theme]} />
              </div>
            ) : (
              <Icon icon={icons.search[theme]} />
            )}
          </div>
        )}
        <div className="header__icon header__icon--menu" onClick={toggleMenu}>
          <Icon icon={isMenuOpen ? icons.close[theme] : icons.menu[theme]} />
        </div>
        <button
          onClick={toggleTheme}
          className="header__icon header__switch-theme"
        >
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
        <div
          className={classNames('header__buttons-wrapper', {
            'header__buttons-wrapper--bottom': isMenuOpen,
          })}
          onClick={() => {
            if (isMenuOpen) {
              toggleMenu();
            }
          }}
        >
          <NavLink className={getActiveIcon} to="/favorites">
            <div className="header__icon-wrapper">
              {favorites.length ? (
                <span className="header__quantity">{favorites.length}</span>
              ) : null}

              <Icon icon={icons.favorites[theme]} />
            </div>
          </NavLink>

          <NavLink className={getActiveIcon} to="/cart">
            <div className="header__icon-wrapper">
              <Icon icon={icons.shopping_cart[theme]} />
              {totalQuantity > 0 && (
                <span className="header__quantity">{totalQuantity}</span>
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
