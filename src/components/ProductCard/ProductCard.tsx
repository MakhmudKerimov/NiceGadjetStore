import './ProductCard.scss';
import React, { memo, useMemo } from 'react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import type { Product } from '../../types/Product';
import { useCart, useFavorites, useTheme } from '../../hooks/useGlobalContext';
import { DISPLAY_TYPES } from '../../constants';
import { Icon } from '../Icon';
import { icons } from '../../constants/iconsObject';

type Props = {
  product: Product;
  displayType: (typeof DISPLAY_TYPES)[keyof typeof DISPLAY_TYPES];
};

export const ProductCard: FC<Props> = memo(({ product, displayType }) => {
  const { cart, addToCart } = useCart();
  const { favorites, toggleFavorites } = useFavorites();
  const { theme } = useTheme();

  const isInCart = useMemo(
    () => cart.some(({ id }) => id === product.itemId),
    [cart, product.itemId],
  );
  const isFavorites = useMemo(
    () => favorites.some(({ itemId }) => itemId === product.itemId),
    [favorites, product.itemId],
  );

  return (
    <article className="productCard">
      <Link
        className="productCard__container"
        to={`/${product.category}/${product.itemId}`}
        aria-label={`View details for ${product.name}`}
      >
        <div className="productCard__container-photo">
          <img
            src={product.image}
            alt={`${product.name} product image`}
            className="productCard__photo"
            loading="lazy"
          />
        </div>

        <div className="productCard__container-title">
          <h3 className="productCard__title">{product.name}</h3>
        </div>

        <div className="productCard__container-price">
          {displayType === DISPLAY_TYPES.FULL_PRICE && (
            <span className="productCard__price-regular-without-discount">
              {`$${product.fullPrice}`}
            </span>
          )}

          {displayType === DISPLAY_TYPES.WITH_DISCOUNT && (
            <>
              <span className="productCard__price-discount">
                {`$${product.price}`}
              </span>
              <span className="productCard__price-regular">
                {`$${product.fullPrice}`}
              </span>
            </>
          )}
        </div>

        <div className="productCard__divider"></div>

        <div className="productCard__container-specifications">
          <div className="productCard__block">
            <span className="productCard__info">Screen</span>
            <span className="productCard__value">{product.screen}</span>
          </div>
          <div className="productCard__block">
            <span className="productCard__info">Capacity</span>
            <span className="productCard__value">{product.capacity}</span>
          </div>
          <div className="productCard__block">
            <span className="productCard__info">RAM</span>
            <span className="productCard__value">{product.ram}</span>
          </div>
        </div>

        <div className="productCard__container-buttons">
          <button
            className={classNames(
              'productCard__button',
              'productCard__button-card',
              { 'productCard__button-card--active': isInCart },
            )}
            onClick={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
            ) => {
              event.preventDefault();
              addToCart(product);
            }}
            aria-label={
              isInCart
                ? `Remove ${product.name} from cart`
                : `Add ${product.name} to cart`
            }
            aria-pressed={isInCart}
          >
            {isInCart ? `Added` : `Add to cart`}
          </button>
          <button
            className={classNames(
              'productCard__button',
              'productCard__button-favorites',
              { 'productCard__button-favorites--active': isFavorites },
            )}
            onClick={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
            ) => {
              event.preventDefault();
              toggleFavorites(product);
            }}
            aria-label={
              isFavorites
                ? `Remove ${product.name} from favorites`
                : `Add ${product.name} to favorites`
            }
            aria-pressed={isFavorites}
          >
            {isFavorites ? (
              <Icon icon={icons.favorites__filled[theme]} />
            ) : (
              <Icon icon={icons.favorites[theme]} />
            )}
          </button>
        </div>
      </Link>
    </article>
  );
});

ProductCard.displayName = 'ProductCard';
