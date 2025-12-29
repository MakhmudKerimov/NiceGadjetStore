import { useContext, useMemo } from 'react';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { PicturesSlider } from './components/PicturesSlider/PicturesSlider';
import './HomePage.scss';
import { GlobalContext } from '../../context/GlobalContext';
import { ShopByCategory } from './components/ShopByCategory/ShopByCategory';

export const HomePage = () => {
  const { allProducts } = useContext(GlobalContext);

  const newestPhones = useMemo(
    () =>
      [...allProducts]
        .filter(product => product.category === 'phones')
        .sort((phone1, phone2) => phone2.year - phone1.year)
        .slice(0, 20),
    [allProducts],
  );

  const hotPricesProducts = useMemo(
    () =>
      [...allProducts]
        .map(product => ({
          ...product,
          discount:
            ((product.fullPrice - product.price) / product.fullPrice) * 100,
        }))
        .sort((product1, product2) => product2.discount - product1.discount)
        .slice(0, 20),
    [allProducts],
  );

  return (
    <div className="homePage">
      <h1 className="homePage__title">Welcome to the Home Page</h1>
      <PicturesSlider />
      <ProductsSlider
        displayType="with-discount"
        products={newestPhones}
        title="Brand new models"
      />

      <ShopByCategory />

      <ProductsSlider
        title="Hot prices"
        products={hotPricesProducts}
        displayType="with-discount"
      />
    </div>
  );
};
