import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import './CarDetails.css';
import { Link } from 'react-router-dom';
import LastPage from '../../assets/home.png';
import Edit from '../../assets/edit.png';
import Delete from '../../assets/delete.png'
import { useState } from 'react';
import { deleteCar, updateCar } from '../../redux/slices/carSlices';

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  const car = useAppSelector(state => state.cars.cars.find((car: any) => car.id === Number(id)));


  const [visible, setVisible] = useState(true);

  const [editableCar, setEditableCar] = useState(car);

  const handleEditClick = () => {
    setVisible(false);
  };

  const handledeleteClick = () => {
    dispatch(deleteCar(car.id))
  }
  const handleSaveClick = () => {
    dispatch(updateCar(editableCar));
    setVisible(true);
  };

  const handleCancelClick = () => {
    setEditableCar(car);
    setVisible(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
    setEditableCar({
      ...editableCar,
      [field]: e.target.value
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditableCar({
          ...editableCar,
          image: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!car) {
    return <p>Maşın tapılmadı.</p>;
  }

  return (
    <>
      <div className='Home_edit_container'>
        <Link to='/'><img style={{ width: '50px' }} src={LastPage} /></Link>
        {visible && (
          <img onClick={handleEditClick} style={{ width: '50px' }} src={Edit} />
        )}
        {!visible && (
          <Link to = '/'>
            <img style={{ width: '50px' }} onClick={handledeleteClick} src={Delete} alt="" />
          </Link>
        )}
      </div>

      <div className="car-details">
        {visible ? (
          <>
            <div className='img_container'>
              <img style={{ width: '300px' }} src={car.image} alt={`${car.make} ${car.model}`} />
            </div>
          </>
        ) : (
          <>
            <div className='img_container'>
              <img className='img_profil' src={editableCar.image} alt="Car" />
              <input className='img_add' name="image" type='file' onChange={handleImageChange} />
            </div>
          </>)}
      </div>
      <div className='make_model_container_edit'>
        <div className='make_model_container'>
          {visible ? (
            <>
              <h2>{car.make} {car.model}</h2>
            </>
          ) : (
            <>
              <div className='make_model_container_edit'>
                <div className='make_container_edit'>
                  <h2>Make:</h2>
                  <span>
                    <select className='make_choose' name="make" value={editableCar.make} onChange={(e) => handleChange(e, 'make')}>
                      <option value="" disabled>Choose the car make</option>
                      <option value="honda">Honda</option>
                      <option value="toyota">Toyota</option>
                      <option value="mercedes-benz">Mercedes-Benz</option>
                      <option value="audi">Audi</option>
                      <option value="chevrolet">Chevrolet</option>
                      <option value="nissan">Nissan</option>
                      <option value="bmw">BMW</option>
                      <option value="tesla">Tesla</option>
                      <option value="subaru">Subaru</option>
                      <option value="lexus">Lexus</option>
                      <option value="jeep">Jeep</option>
                      <option value="kia">Kia</option>
                    </select>
                  </span>
                </div>
                <div className='model_container_edit'>
                  <h2>Model:</h2>
                  <span><input type='text' className='model_choose' value={editableCar.model} onChange={(e) => handleChange(e, 'model')} /></span>
                </div>
              </div>
            </>
          )}
        </div>
        <div className='PriceContainer'>
          {visible ? (
            <>
              <p className='year'>Year: {car.year}</p>
              <p className='price'>Price: {car.price} $</p>
            </>
          ) : (
            <>
              <div className='year_container'>
                <p className='year_word'>Year:</p>
                <input type='text' className='year_input' value={editableCar.year} onChange={(e) => handleChange(e, 'year')} />
              </div>
              <div className='price_container'>
                <div className='price_container_input'>
                  <p className='year_word'>Price:</p>
                  <input className='year_input' type='text' value={editableCar.price} onChange={(e) => handleChange(e, 'price')} />
                </div>
                <span style={{ fontSize: '2rem' }}>$</span>
              </div>
            </>
          )}
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
                {visible ? (
                  <>
                    <td className='table_item'>{car.color}</td>
                    <td className='table_item'>{car.mileage}</td>
                    <td className='table_item'>{car.fuelType}</td>
                    <td className='table_item'>{car.transmission}</td>
                    <td className='table_item'>{car.engine}</td>
                    <td className='table_item'>{car.horsepower}</td>
                    <td className='table_item'>{car.features.join(', ')}</td>
                    <td className='table_item'>{car.owners}</td>
                  </>
                ) : (
                  <>
                    <td className='table_item'>
                      <select className='select_edit_car_color' name="color" value={editableCar.color} onChange={(e) => handleChange(e, 'color')}>
                        <option value="" disabled>Select Color</option>
                        <option value="white">White</option>
                        <option value="silver">Silver</option>
                        <option value="blue">Blue</option>
                        <option value="red">Red</option>
                        <option value="green">Green</option>
                        <option value="black">Black</option>
                        <option value="gray">Gray</option>
                      </select>
                    </td>
                    <td className='table_item'><input type='text' value={editableCar.mileage} onChange={(e) => handleChange(e, 'mileage')} /></td>
                    <td className='table_item'><input type='text' value={editableCar.fuelType} onChange={(e) => handleChange(e, 'fuelType')} /></td>
                    <td className='table_item'><input type='text' value={editableCar.transmission} onChange={(e) => handleChange(e, 'transmission')} /></td>
                    <td className='table_item'><input type='text' value={editableCar.engine} onChange={(e) => handleChange(e, 'engine')} /></td>
                    <td className='table_item'><input type='text' value={editableCar.horsepower} onChange={(e) => handleChange(e, 'horsepower')} /></td>
                    <td className='table_item'><input type='text' value={editableCar.features} onChange={(e) => handleChange(e, 'features')} /></td>
                    <td className='table_item'><input type='text' value={editableCar.owners} onChange={(e) => handleChange(e, 'owners')} /></td>
                  </>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {!visible && (
        <div className='send_button'>
          <button className='button' onClick={handleSaveClick}>Save</button>
          <button className='button' type="button" onClick={handleCancelClick}>Cancel</button>
        </div>
      )}
    </>
  );
};

export default CarDetails;
