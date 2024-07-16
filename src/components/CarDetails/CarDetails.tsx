import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import './CarDetails.css';
import { Link } from 'react-router-dom';
import LastPage from '../../assets/home.png';

const CarDetails = () => {
  
  const { id } = useParams<{ id: string }>();

  const car = useAppSelector(state => state.cars.cars.find((car:any) => car.id === Number(id)));

  if (!car) {
    return <p>Maşın tapılmadı.</p>;
  }

  return (
    <>
      <div style={{ paddingTop: '1rem', paddingLeft: '1rem', paddingBottom: '2rem' }}>
        <Link to='/'><img style={{ width: '50px' }} src={LastPage} /></Link>
      </div>

      <div className="car-details">
        <div className='img_container'>
          <img style={{ width: '300px' }} src={car.image} alt={`${car.make} ${car.model}`} />
        </div>
        <div className='make_model_container'>
          <h2>{car.make} {car.model}</h2>
        </div>
        <div className='PriceContainer'>
          <p className='year'>Year: {car.year}</p>
          <p className='price'>Price: {car.price} $</p>
        </div>

        <div className='table_item_container'>
          <table>
            <thead>
              <tr style={{ height: '50px' }}>
                <th style={{ fontSize: '2rem', padding: '1rem' }}>Characteristics</th>
              </tr>
            </thead>
            <tbody style={{ display: 'flex' }}>
              <tr className='table_items'>
                <td className='table_item'>Color</td>
                <td className='table_item'>Mileage</td>
                <td className='table_item'>Fuel Type</td>
                <td className='table_item'>Transmission</td>
                <td className='table_item'>Engine</td>
                <td className='table_item'>Horse power</td>
                <td className='table_item'>Features</td>
                <td className='table_item'>Owners</td>
              </tr>
              <tr className='table_items'>
                <td className='table_item'>{car.color}</td>
                <td className='table_item'>{car.mileage}</td>
                <td className='table_item'>{car.fuelType}</td>
                <td className='table_item'>{car.transmission}</td>
                <td className='table_item'>{car.engine}</td>
                <td className='table_item'>{car.horsepower}</td>
                <td className='table_item'>{car.features.join(', ')}</td>
                <td className='table_item'>{car.owners}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CarDetails;
