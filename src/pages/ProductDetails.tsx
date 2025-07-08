import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { RootState } from '../app/store';
import InnerImageZoom from 'react-inner-image-zoom';
import { ReviewCategory } from '../types/Review';
import { Accessory, Bicycle } from '../types/Product';
import { BreadCrumb, PriceRange } from '../components/shop';
import { addToCart, updateQuantity } from '../features/cart/cartSlice';
import { hasFixedPrice } from '../utils/helperFunctions';
import {
  ProductReviews,
  ProductReviewForm,
  PriceSelect,
  ProductCategory,
  ConfirmAddToCart,
} from '../components/shop/product-details';

import 'react-inner-image-zoom/lib/styles.min.css';

export default function ProductDetails() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { category, id } = useParams<{ category: string; id: string }>();
  const fallbackProduct = location.state?.product;

  // Get a list of all products from the chossen categroy
  const product =
    useSelector((state: RootState) => {
      if (category === 'bicycle') {
        return state.bicycles.allBicycles.find(
          (p: Bicycle) => p.id === Number(id)
        );
      }
      if (category === 'accessory') {
        return state.accessories.allAccessories.find(
          (p: Accessory) => p.id === Number(id)
        );
      }
      return null;
    }) || fallbackProduct;

  // States
  const [amountOfItems, setAmountOfItems] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [confirmMessageVissible, setConfirmMessageVissible] = useState(false);

  // In case there is no corresponding product found
  if (!product) {
    return <p>Product not found.</p>;
  }

  // Update the quantity value after change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value);
    setAmountOfItems(isNaN(value) ? 1 : value);
  };

  // On submit, update the product with the new quantity value and add the product to the cart
  const handleAdd = (price: string = product.price, size?: string) => {
    dispatch(
      updateQuantity({
        id: product.id,
        quantity: amountOfItems,
      })
    );
    dispatch(
      addToCart({
        id: product.id,
        type: product.type,
        name: product.name,
        introduction: product.introduction,
        description: product.description,
        price,
        size,
        quantity: amountOfItems,
        image_url: product.image_url,
      })
    );
    setAmountOfItems(1); // Reset quantity field
    setConfirmMessageVissible(true); // Confirm item is added to cart
  };

  // Handle change between tabs
  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setActiveTab(e.currentTarget.value);
  }

  return (
    <div className="details">
      <div className="details-container">
        {confirmMessageVissible && <ConfirmAddToCart name={product.name} />}
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
                  <div>€{product.price.toFixed(2)}</div>
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
                  min="1"
                  step="1"
                  inputMode="numeric"
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
        </div>
      </div>
    </div>
  );
}
