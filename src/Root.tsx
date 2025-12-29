import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Layout } from './components/Layout/Layout';
import { Loader } from './components/Loader/Loader';

// Lazy load pages for better performance
const HomePage = lazy(() =>
  import('./pages/HomePage/HomePage').then(module => ({
    default: module.HomePage,
  })),
);
const FavoritesPage = lazy(() =>
  import('./pages/FavoritesPage/FavoritesPage').then(module => ({
    default: module.FavoritesPage,
  })),
);
const ShoppingCartPage = lazy(() =>
  import('./pages/ShoppingCartPage/ShoppingCartPage').then(module => ({
    default: module.ShoppingCartPage,
  })),
);
const ProductPage = lazy(() =>
  import('./pages/ProductPage/ProductPage').then(module => ({
    default: module.ProductPage,
  })),
);
const ProductDetailsPage = lazy(() =>
  import('./pages/ProductDetailsPage/ProductDetailsPage').then(module => ({
    default: module.ProductDetailsPage,
  })),
);

export const Root = () => (
  <Router>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route path="favorites" element={<FavoritesPage />} />

          <Route path="cart" element={<ShoppingCartPage />} />

          <Route path="phones">
            <Route index element={<ProductPage category="phones" />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>

          <Route path="tablets">
            <Route index element={<ProductPage category="tablets" />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>

          <Route path="accessories">
            <Route index element={<ProductPage category="accessories" />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  </Router>
);
