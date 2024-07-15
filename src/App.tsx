import { useState, useEffect } from 'react';
import { useGetCarQuery } from './services/carApi';
import { useAppSelector } from './redux/hooks';
import { Link, Outlet } from 'react-router-dom';
import Logo from './assets/car.jpg';
import CarDetailsFilter from './components/CarDetailsFilter/CarDetailsFilter';
import './App.css';

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  color: string;
  price: number;
  image: string;
}

interface Filters {
  make: string;
  price: number;
  color: string;
  year: number;
}

const App = () => {
  const { } = useGetCarQuery();

  const carList = useAppSelector(state => state.cars.cars);
  
  const maxPrice = 99999;
  
  const maxYear = 2024;

  const [filteredCars, setFilteredCars] = useState<Car[]>(carList);

  const [filters, setFilters] = useState<Filters>({ make: '', price: maxPrice, color: '', year: maxYear });

  useEffect(() => {
    let filtered = carList;

    if (filters.make) {
      filtered = filtered.filter((car: Car) => car.make.toLowerCase() === filters.make.toLowerCase());
    }

    if (filters.price) {
      filtered = filtered.filter((car: Car) => car.price <= filters.price);
    }

    if (filters.color) {
      filtered = filtered.filter((car: Car) => car.color.toLowerCase() === filters.color.toLowerCase());
    }

    if (filters.year) {
      filtered = filtered.filter((car: Car) => car.year <= filters.year);
    }

    setFilteredCars(filtered);
  }, [filters, carList]);

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  return (
    <>
      <div className='all_items_container'>
        <a href='/' style={{ textDecoration: 'none' }}>
          <div className='logo_container'>
            <div>
              <img className='logo_img' src={Logo} alt="Logo" />
            </div>
            <div>
              <span className='website_name'>TURBOCAR.AZ</span>
            </div>
          </div>
        </a>

        <div className='items_container'>
          <div className='filter_components_container'>
            <CarDetailsFilter onFilterChange={handleFilterChange} />
            <Outlet />
          </div>
          {filteredCars.length > 0 ? (
            <div className='container'>
              <div className='container_items'>
                {filteredCars.map((car) => (
                  <div className='container_items_item hover' key={car.id}>
                    <Link style={{ textDecoration: 'none' }} to={`/car/${car.id}`}>
                      <div className='items'>
                        <img style={{ width: '200px' }} src={car.image} alt={`${car.make} ${car.model}`} />
                        <h3>{car.make} {car.model}</h3>
                        <p>Year: {car.year}</p>
                        <p>Color: {car.color}</p>
                        <p>Price: {car.price}$</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className='NodatafoundContainer'>
              <p className='Nodatafound'>No data found !</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
