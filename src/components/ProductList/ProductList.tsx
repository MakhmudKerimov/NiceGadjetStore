import type { FC } from 'react';
import type { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductList.scss';

type Props = {
  products: Product[];
  displayType: 'fullPrice' | 'with-discount';
};

export const ProductList: FC<Props> = ({ products, displayType }) => {
  return (
    <div className="productsList">
      {products.map(product => (
        <div className="productItem" key={product.id}>
          <ProductCard product={product} displayType={displayType} />
        </div>
      ))}
    </div>
  );
};
