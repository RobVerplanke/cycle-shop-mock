import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import BreadCrumb from '../components/shop/BreadCrumb';
import ProductReviews from '../components/shop/product-details/ProductReviews';
import ProductReviewForm from '../components/shop/product-details/ProductReviewForm';
import { ReviewCategory } from '../types/Review';
import PriceRange from '../components/shop/PriceRange';
import PriceSelect from '../components/shop/product-details/PriceSelect';
import ProductCategory from '../components/shop/product-details/ProductCategory';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { addToCart, updateQuantity } from '../features/cart/cartSlice';
import { hasFixedPrice } from '../utils/helperFunctions';

export default function ProductDetails() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [amountOfItems, setAmountOfItems] = useState(1);
  const product = location.state?.product;
  const [activeTab, setActiveTab] = useState('description');

  // Log cart items for testing
  const cartItems = useSelector((state: RootState) => state.cart.items);
  console.log('cartItems:', cartItems);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value);
    setAmountOfItems(isNaN(value) ? 1 : value);
    dispatch(
      updateQuantity({
        id: product.id,
        quantity: amountOfItems,
      })
    );
  };

  const handleAdd = (price: string = product.price, size?: string) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price,
        size,
        quantity: amountOfItems,
        image_url: product.image_url,
      })
    );
  };

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setActiveTab(e.currentTarget.value);
  }

  if (!product) {
    return <p>Productdetails not available</p>;
  }

  return (
    <div className="details">
      <div className="details-container">
        <div className="top-section">
          <div className="top-section__image">
            <InnerImageZoom
              src={product.image_url}
              zoomSrc={product.image_url}
              zoomType="hover"
              zoomScale={0.8}
              width={400}
              height={400}
            />
          </div>
          <div className="top-section__details">
            <div className="top-section__breadcrumb">
              <div className="breadcrumb__path">
                <BreadCrumb type={product.type} name={product.name} />
              </div>
            </div>
            <div className="top-section__category">
              <ProductCategory type={product.type} />
            </div>
            <div className="top-section__name">
              <h5>{product.name}</h5>
            </div>
            <div className="top-section__price">
              {hasFixedPrice(product) ? (
                <div className="price__value">
                  <div>€{product.price}</div>
                </div>
              ) : (
                <PriceRange prices={product.prices} />
              )}
            </div>
            <div className="top-section__introduction">
              <p>{product.introduction}</p>
            </div>
            {hasFixedPrice(product) ? (
              <div className="top-section__add-item">
                <input
                  type="number"
                  value={amountOfItems}
                  onChange={handleChange}
                />
                <button onClick={() => handleAdd(product.price.toString())}>
                  ADD TO CART
                </button>
              </div>
            ) : (
              <PriceSelect
                prices={product.prices}
                amount={amountOfItems}
                onChange={handleChange}
                handleAdd={handleAdd}
              />
            )}
          </div>
        </div>
        <div className="bottom-section">
          <div className="bottom-section__additionals">
            <div className="bottom-section__additionals__navigation">
              <button
                value="description"
                className={
                  activeTab === 'description'
                    ? 'active'
                    : 'bottom-section__additionals__navigation__button'
                }
                onClick={handleClick}
              >
                Description
              </button>

              {!hasFixedPrice(product) ? (
                <button
                  value="additional"
                  className={
                    activeTab === 'additional'
                      ? 'active'
                      : 'bottom-section__additionals__navigation__button'
                  }
                  // className="bottom-section__additionals__navigation__button"
                  onClick={handleClick}
                >
                  Additional information
                </button>
              ) : (
                ''
              )}

              <button
                value="reviews"
                className={
                  activeTab === 'reviews'
                    ? 'active'
                    : 'bottom-section__additionals__navigation__button'
                }
                onClick={handleClick}
              >
                Reviews
              </button>
            </div>
            {activeTab === 'description' && (
              <div className="bottom-section__additionals__description">
                <p>{product.description}</p>
              </div>
            )}

            {activeTab === 'additional' && (
              <div className="bottom-section__additionals__additional">
                <div className="bottom-section__additionals__additional__title">
                  Size
                </div>
                <div className="bottom-section__additionals__additional__data">
                  M, L, XL
                </div>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="bottom-section__additionals__reviews">
                <div className="reviews">
                  <ProductReviews
                    item_id={product.id}
                    item_type={product.type as ReviewCategory}
                  />
                </div>
                <div className="reviews-form">
                  <ProductReviewForm
                    item_id={product.id}
                    item_type={product.type as ReviewCategory}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="bottom-section__related-items">
            <div className="bottom-section__related-items__title">
              <h2>RELATED PRODUCTS</h2>
            </div>
            <div className="bottom-section__related-items__cards"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
