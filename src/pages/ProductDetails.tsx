import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BreadCrumb from '../components/shop/BreadCrumb';
import ProductReviews from '../components/shop/product-details/ProductReviews';
import ProductReviewForm from '../components/shop/product-details/ProductReviewForm';
import { ProductItem } from '../types/Product';
import { ReviewCategory } from '../types/Review';

export default function ProductDetails() {
  const location = useLocation();
  const product = location.state?.product as ProductItem | undefined;
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return <p>Productdetails not available</p>;
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setActiveTab(e.currentTarget.value);
  }

  return (
    <div className="details">
      <div className="details-container">
        <div className="top-section">
          <div className="top-section__image">
            <img src={product.image_url} alt="" />
          </div>
          <div className="top-section__details">
            <div className="top-section__breadcrumb">
              <div className="breadcrumb__fixed">
                <Link to="/">Home</Link>
              </div>
              <div className="breadcrumb__path">
                <BreadCrumb />
              </div>
            </div>
            <div className="top-section__category">
              <p>{product.type}</p>
            </div>
            <div className="top-section__title">
              <h4>{product.name}</h4>
            </div>
            <div className="top-section__price">
              <p>e350.00</p>
            </div>
            <div className="top-section__introduction">
              <p>{product.introduction}</p>
            </div>
            <div className="top-section__add-item">
              <input type="number" />
              <button>ADD TO CART</button>
            </div>
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
