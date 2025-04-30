import { FaRegCirclePlay } from 'react-icons/fa6';

function Programme() {
  return (
    <header className="programme">
      <div className="programme__overlay"></div>
      <div className="programme__title">
        <h3>Join #GoEcoBiking Programme</h3>
      </div>
      <div className="programme__movie">
        <div className="programme__movie__play-button">
          <FaRegCirclePlay size={40} />
        </div>
        <div className="programme__movie__title">
          <h3>Watch Full Video</h3>
        </div>
      </div>
      <div className="programme__content">
        <div className="programme__content__left">
          <div className="programme__content__left__title">
            <h2>Duis aute irure dolor in reprehenderit velit.</h2>
          </div>
          <div className="programme__content__left__text">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis.
            </p>
          </div>
        </div>
        <div className="programme__content__button">
          <button>Join the programme</button>
        </div>
      </div>
    </header>
  );
}

export default Programme;
