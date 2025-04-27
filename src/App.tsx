import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import './scss/style.scss';

function App() {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
