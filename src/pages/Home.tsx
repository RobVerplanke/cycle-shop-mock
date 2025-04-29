import DiscoverBikes from '../components/home/DiscoverBikes';
import Header from '../components/home/Header';
import cityBikeImg from '../assets/city-bike.jpg';
import moutainBikeImg from '../assets/mountain-bike.jpg';
import specialityBikeImg from '../assets/speciality-bike.jpg';
import Specifications from '../components/home/Specifications';

const bikesListItems = [
  'Officia deserunt mollit',
  'Excepteur sint occaecat',
  'Sunt in culpa qui',
  'Officia deserunt mollit',
  'Excepteur sint occaecat',
  'Sunt in culpa qui',
];

function Home() {
  return (
    <div className="homepage">
      <Header />
      <DiscoverBikes
        title={'Discover The Collection'}
        subTitle={'Mountain Bikes'}
        introduction={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus.'
        }
        backgroundImage={moutainBikeImg}
        listItems={bikesListItems}
      />
      <DiscoverBikes
        title={'Discover The Collection'}
        subTitle={'City Bikes'}
        introduction={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus.'
        }
        backgroundImage={cityBikeImg}
        listItems={bikesListItems}
      />
      <DiscoverBikes
        title={'Discover The Collection'}
        subTitle={'Speciality Bikes'}
        introduction={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus.'
        }
        backgroundImage={specialityBikeImg}
        listItems={bikesListItems}
      />
      <Specifications />
    </div>
  );
}
export default Home;
