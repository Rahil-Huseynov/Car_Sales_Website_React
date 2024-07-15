import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addCar } from '../../redux/slices/carSlices';
import { Link } from 'react-router-dom';
import HomePage from '../../assets/home.png';
import './AddCar.css';
import AddImG from '../../assets/add_img.webp';
import Logo from '../../assets/car.jpg';

interface ICar {
    id: number;
    make: string;
    model: string;
    year: number;
    color: string;
    mileage: number;
    price: number;
    fuelType: string;
    transmission: string;
    engine: string;
    horsepower: number;
    features: string[];
    owners: number;
    image: string;
}

const AddCar = () => {
    const dispatch = useDispatch();
    const [car, setCar] = useState<ICar>({
        id: 0,
        make: '',
        model: '',
        year: 2020,
        color: '',
        mileage: 0,
        price: 0,
        fuelType: '',
        transmission: '',
        engine: '',
        horsepower: 0,
        features: [],
        owners: 0,
        image: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "features") {
            setCar(prevCar => ({ ...prevCar, features: value.split(',') }));
        } else {
            setCar(prevCar => ({ ...prevCar, [name]: value }));
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCar(prevCar => ({ ...prevCar, image: e.target?.result as string }));
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(addCar(car));
        setCar({
            id: 0,
            make: '',
            model: '',
            year: 2020,
            color: '',
            mileage: 0,
            price: 0,
            fuelType: '',
            transmission: '',
            engine: '',
            horsepower: 0,
            features: [],
            owners: 0,
            image: '',
        });
    };

    return (
        <>
            <div className='all_items_container'>
                <div className='logo_container'>
                    <div>
                        <img className='logo_img' src={Logo} alt="Logo" />
                    </div>
                    <div>
                        <span className='website_name'>TURBOCAR.AZ</span>
                    </div>
                </div>
            </div>

            <div className="car-details">
                <div className='img_container'>
                    <img className='img_profil' src={car.image || AddImG} alt="Car" />
                    <input className='img_add' name="image" type='file' onChange={handleImageChange} />
                </div>
                <div className='make_model_container'>
                    <div className='make_model'>
                        <h2>Make:</h2>
                        <input className='input' name="make" value={car.make} onChange={handleChange} placeholder="Make" />
                    </div>
                    <div className='make_model'>
                        <h2>Model:</h2>
                        <input className='input' name="model" value={car.model} onChange={handleChange} placeholder="Model" />
                    </div>
                </div>
                <div className='PriceContainer'>
                    <div className='year_price year'>
                        <p>Year:</p>
                        <input className='input' name="year" type="number" value={car.year} onChange={handleChange} placeholder="Year" />
                    </div>
                    <div className='year_price price'>
                        <p>Price:</p>
                        <input className='input' name="price" type="number" value={car.price} onChange={handleChange} placeholder="Price" /> <span>$</span>
                    </div>
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
                                <input name="color" value={car.color} onChange={handleChange} placeholder="Color" />
                                <input name="mileage" className="type_number_input" type="number" value={car.mileage} onChange={handleChange} placeholder="Mileage" />
                                <input name="fuelType" value={car.fuelType} onChange={handleChange} placeholder="Fuel Type" />
                                <input name="transmission" value={car.transmission} onChange={handleChange} placeholder="Transmission" />
                                <input name="engine" value={car.engine} onChange={handleChange} placeholder="Engine" />
                                <input name="horsepower" className="type_number_input" type="number" value={car.horsepower} onChange={handleChange} placeholder="Horsepower" />
                                <input name="features" value={car.features.join(',')} onChange={handleChange} placeholder="Features" />
                                <input name="owners" className="type_number_input" type="number" value={car.owners} onChange={handleChange} placeholder="Owners" />
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='send_button'>
                    <button className='button' type="submit" onClick={handleSubmit}>Add Car</button>
                    <Link to='/'> <button className='button' type="submit">Return Home</button></Link>
                </div>
            </div>
        </>
    );
};

export default AddCar;