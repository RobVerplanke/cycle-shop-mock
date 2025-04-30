import { FaTruckMoving } from 'react-icons/fa6';
import { MdHomeRepairService } from 'react-icons/md';
import { FaStore } from 'react-icons/fa';

function Telephone() {
  return (
    <section className="telephone">
      <div className="telephone__sales">
        <div className="telephone__sales__icon">
          <FaTruckMoving size={30} />
        </div>
        <div className="telephone__sales__number">
          <h5>1 800 755 60 21</h5>
        </div>
        <div className="telephone__sales__subtitle">
          <p>Sales Related Enquiries</p>
        </div>
      </div>
      <div className="telephone__service">
        <div className="telephone__service__icon">
          <MdHomeRepairService size={30} />
        </div>
        <div className="telephone__service__number">
          <h5>1 800 755 60 22</h5>
        </div>
        <div className="telephone__service__subtitle">
          Service Related Enquiries
        </div>
      </div>
      <div className="telephone__dealer">
        <div className="telephone__dealer__icon">
          <FaStore size={30} />
        </div>
        <div className="telephone__dealer__number">
          <h5>1 800 755 60 23</h5>
        </div>
        <div className="telephone__dealer__subtitle">
          Dealership Related Enquiries
        </div>
      </div>
    </section>
  );
}

export default Telephone;
