import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCar, changeCar } from '../store/cars-slice';
import "./Add-edit-car.css";

export default function AddEditCar(props){
    const dispatch = useDispatch();
    const cars = useSelector(state => state.cars);

    let car = null;
    const isAdd = !Boolean(props.carId);

    if (props.carId) {
        for (let index = 0; index < cars.length; index++){
            if (cars[index].id === props.carId) {
                car = Object.assign({},cars[index]);
                break;
            }
        }
    }

    const [name, setName] = useState(car ? car.car : "");
    const [model, setModel] = useState(car ? car.car_model : "");
    const [vin, setVin] = useState(car ? car.car_vin : "");
    const [color, setColor] = useState(car ? car.car_color : "");
    const [year, setYear] = useState(car ? car.car_model_year : "");
    const [price, setPrice] = useState(car ? car.price.slice(1) : "");
    const [availability, setAvailability] = useState(car ? car.availability : false);

    return <div className="add-edit-car">
        <div className="input-block">
            <div className="property"><input type="text" placeholder="Company" value={name} onChange={(e) => setName(e.target.value)} disabled={!isAdd} /></div>
            <div className="property"><input type="text" placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} disabled={!isAdd} /></div>
            <div className="property"><input type="text" placeholder="VIN" value={vin} onChange={(e) => setVin(e.target.value)} disabled={!isAdd} /></div>
            <div className="property"><input type="text" placeholder="Color" value={color} onChange={(e) => setColor(e.target.value)} /></div>
            <div className="property"><input type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} disabled={!isAdd} /></div>
            <div className="property"><input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} /></div>
            <div className="property"><label>Availability: <input type="checkbox" checked={availability} onChange={(e) => setAvailability(e.target.checked)} /></label></div>
        </div>
        <div className="confirm-block">
            <div className="button" onClick={() => {
                if (isAdd){
                    dispatch(addCar({car: {car: name, car_model: model, car_vin: vin, car_model_year: year, car_color: color, price: "$" + price, availability: availability}}));
                    props.close();
                } else {
                    dispatch(changeCar({id: props.carId, car: {car: name, car_model: model, car_vin: vin, car_model_year: year, car_color: color, price: "$" + price, availability: availability}}));
                    props.close();
                }
            }}>Yes</div>
            <div className="button"onClick={() => {
                props.close();
            }}>No</div>
        </div>
    </div>
}