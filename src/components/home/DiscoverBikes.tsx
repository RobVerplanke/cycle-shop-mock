import { SiTarget } from 'react-icons/si';
import { DiscoverProps } from '../../types/discovery';

function DiscoverBikes({
  title,
  subTitle,
  introduction,
  listItems,
  backgroundImage,
}: DiscoverProps) {
  return (
    <section
      className="discover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="discover__overlay"></div>
      <div className="discover__container">
        <div className="discover__title">
          <h5>{title}</h5>
        </div>
        <div className="discover__subtitle">
          <h3>{subTitle}</h3>
        </div>
        <div className="discover__introduction">
          <p>{introduction}</p>
        </div>
        <div className="discover__list-items">
          <ul className="discover__list">
            {listItems.map((item) => {
              return (
                <li className="discover__list-item">
                  <div className="discover__list-style">
                    <SiTarget />
                  </div>
                  <div className="discover__list-item__content">
                    <span>{item}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="discover__button">
          <button>EXPLORE NOW</button>
        </div>
      </div>
    </section>
  );
}

export default DiscoverBikes;
