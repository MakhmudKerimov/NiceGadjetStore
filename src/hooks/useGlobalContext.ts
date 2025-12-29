import { useContext, useMemo } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { ERROR_MESSAGES } from '../constants';

// Custom hook to optimize context usage
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error(ERROR_MESSAGES.CONTEXT_ERROR);
  }

  return context;
};

// Selective context hooks for better performance
export const useCart = () => {
  const { cart, setCart, updateQuantity, clearShoppingCart, addToCart } =
    useGlobalContext();

  return useMemo(
    () => ({
      cart,
      setCart,
      updateQuantity,
      clearShoppingCart,
      addToCart,
    }),
    [cart, setCart, updateQuantity, clearShoppingCart, addToCart],
  );
};

export const useFavorites = () => {
  const { favorites, setFavorites, toggleFavorites } = useGlobalContext();

  return useMemo(
    () => ({
      favorites,
      setFavorites,
      toggleFavorites,
    }),
    [favorites, setFavorites, toggleFavorites],
  );
};

export const useProducts = () => {
  const { allProducts, setAllProducts } = useGlobalContext();

  return useMemo(
    () => ({
      allProducts,
      setAllProducts,
    }),
    [allProducts, setAllProducts],
  );
};

export const useTheme = () => {
  const { theme, toggleTheme } = useGlobalContext();

  return useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme],
  );
};

export const useMenu = () => {
  const { isMenuOpen, setIsMenuOpen, toggleMenu } = useGlobalContext();

  return useMemo(
    () => ({
      isMenuOpen,
      setIsMenuOpen,
      toggleMenu,
    }),
    [isMenuOpen, setIsMenuOpen, toggleMenu],
  );
};
