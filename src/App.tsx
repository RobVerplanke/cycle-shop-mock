import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './scss/style.scss';
import { ScrollToTop } from './utils/helperFunctions';

function App() {
  return (
    <div className="">
      <Navbar />
      {/* // Make sure the scroll postion is set to the top of the page when rendered */}
      <ScrollToTop />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
