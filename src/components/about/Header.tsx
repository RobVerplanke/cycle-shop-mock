import { FaRegCirclePlay } from 'react-icons/fa6';

function AboutUsHeader() {
  return (
    <header className="about">
      <div className="about__overlay"></div>
      <div className="about__title">
        <h1>Who are we</h1>
      </div>
      <div className="about__movie">
        <div className="about__movie__play-button">
          <FaRegCirclePlay size={40} />
        </div>
        <div className="about__movie__title">
          <h3>Watch The Movie</h3>
        </div>
      </div>
    </header>
  );
}

export default AboutUsHeader;
