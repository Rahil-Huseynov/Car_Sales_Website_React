import React, { useState } from 'react';
import './CarDetailsFilter.css';
import { Link } from 'react-router-dom';
import AddCar from '../../assets/plus.png'

interface CarDetailsFilterProps {
  onFilterChange: (filters: Partial<Filters>) => void;
}

interface Filters {
  make: string;
  price: number;
  color: string;
  year: number;
}

const CarDetailsFilter: React.FC<CarDetailsFilterProps> = ({ onFilterChange }) => {
  const [make, setMake] = useState('');

  const [price, setPrice] = useState(1000);

  const [color, setColor] = useState('');

  const [year, setYear] = useState(2000);

  const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

    setMake(event.target.value);

    onFilterChange({ make: event.target.value });
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    setPrice(Number(event.target.value));

    onFilterChange({ price: Number(event.target.value) });
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

    setColor(event.target.value);

    onFilterChange({ color: event.target.value });
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    setYear(Number(event.target.value));

    onFilterChange({ year: Number(event.target.value) });
  };

  return (
    <div className="CarFilter">
      <div className='carFilterItems'>
        <p>Make:</p>
        <select name="make" id="cars" value={make} onChange={handleMakeChange}>
          <option value="">All</option>
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
          <option value="Jeep">Jeep</option>
          <option value="kia">Kia</option>
        </select>
      </div>

      <div className='carFilterItems'>
        <p>Price:</p>
        <input type="range" min="1000" max="99999" step="1000" value={price} onChange={handlePriceChange} />
        <output>{price}$</output>
      </div>

      <div className='carFilterItems'>
        <p>Color:</p>
        <select name="color" id="colors" value={color} onChange={handleColorChange}>
          <option value="">All</option>
          <option value="white">White</option>
          <option value="silver">Silver</option>
          <option value="blue">Blue</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="black">Black</option>
          <option value="gray">Gray</option>
        </select>
      </div>

      <div className='carFilterItems'>
        <p>Year:</p>
        <input type="range" min="2000" max="2023" step="1" value={year} onChange={handleYearChange} />
        <output>{year}</output>
      </div>
      <div className='AddCar_container'>
        <Link to='/car/addcar'>
          <img style={{ width: '50px' }} src={AddCar} />
        </Link>
      </div>
    </div>
  );
};

export default CarDetailsFilter;
