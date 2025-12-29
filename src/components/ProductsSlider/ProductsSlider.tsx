import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FC,
} from 'react';
import type { Product } from '../../types/Product';
import './ProductsSlider.scss';

import { ProductCard } from '../ProductCard/ProductCard';
import { GlobalContext } from '../../context/GlobalContext';
import { Icon } from '../Icon';
import { icons } from '../../constants/iconsObject';
import classNames from 'classnames';

type Props = {
  title: string;
  products: Product[];
  displayType: 'fullPrice' | 'with-discount';
};

export const ProductsSlider: FC<Props> = ({ title, products, displayType }) => {
  const { theme } = useContext(GlobalContext);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(272);
  const gap = 16;

  useEffect(() => {
    const updateCardWidth = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 640) {
        setCardWidth(212);
      } else if (screenWidth < 1200) {
        setCardWidth(237);
      } else {
        setCardWidth(272);
      }
    };

    window.addEventListener('resize', updateCardWidth);

    return () => {
      window.removeEventListener('resize', updateCardWidth);
    };
  }, []);

  const maxIndex = useMemo(() => {
    const maxCardsInTrack = 4;

    return products.length - maxCardsInTrack;
  }, [products.length]);

  const handleNext = useCallback(() => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, maxIndex]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  return (
    <div className="productsSlider">
      <div className="productsSlider__container-top">
        <h2 className="productsSlider__title">{title}</h2>
        <div className="productsSlider__buttons">
          <div
            className={classNames('productsSlider__button', {
              'productsSlider__button--disabled': currentIndex === 0,
            })}
            onClick={handlePrev}
          >
            {currentIndex === 0 ? (
              <Icon icon={icons.arrow_left__disabled[theme]} />
            ) : (
              <Icon icon={icons.arrow_left[theme]} />
            )}
          </div>
          <div
            className={classNames('productsSlider__button', {
              'productsSlider__button--disabled': currentIndex === maxIndex,
            })}
            onClick={handleNext}
          >
            {currentIndex === maxIndex ? (
              <Icon icon={icons.arrow_right__disabled[theme]} />
            ) : (
              <Icon icon={icons.arrow_right[theme]} />
            )}
          </div>
        </div>
      </div>
      <div className="productsSlider__viewport">
        <div
          className="productsSlider__track"
          style={{
            transform: `translateX(-${currentIndex * (cardWidth + gap)}px)`,
          }}
        >
          {products.map(phone => (
            <div
              className="productsSlider__item"
              key={phone.id}
              style={{ width: `${cardWidth}px` }}
            >
              <ProductCard product={phone} displayType={displayType} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
