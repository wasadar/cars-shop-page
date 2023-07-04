import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../store/cars-slice';
import "./Search-panel.css";

export default function SearchPanel(){
    const dispatch = useDispatch();
    const filters = useSelector(state => state.filters);

    const [name, setName] = useState("");
    const [model, setModel] = useState("");
    const [vin, setVin] = useState("");
    const [color, setColor] = useState("");
    const [year, setYear] = useState("");
    const [price, setPrice] = useState("");
    const [availability, setAvailability] = useState("Availability");

    return <div className="search-panel">
        <div className="title-long"><input className="search-field-long" type="text" placeholder="Company" value={name} onChange={(e) => {
            setName(e.target.value);
            dispatch(setFilters({filters: {...filters, car: e.target.value}}));
         }} ></input></div>
        <div className="title-long"><input className="search-field-long" type="text" placeholder="Model" value={model} onChange={(e) => {
            setModel(e.target.value);
            dispatch(setFilters({filters: {...filters, car_model: e.target.value}}));
        }}></input></div>
        <div className="title-long"><input className="search-field-long" type="text" placeholder="VIN" value={vin} onChange={(e) => {
            setVin(e.target.value);
            dispatch(setFilters({filters: {...filters, car_vin: e.target.value}}));
        }}></input></div>
        <div className="title-short"><input className="search-field-short" type="text" placeholder="Color" value={color} onChange={(e) => {
            setColor(e.target.value);
            dispatch(setFilters({filters: {...filters, car_color: e.target.value}}));
        }}></input></div>
        <div className="title-short"><input className="search-field-short" type="number" placeholder="Year" value={year} onChange={(e) => {
            setYear(e.target.value);
            dispatch(setFilters({filters: {...filters, car_model_year: e.target.value}}));
        }}></input></div>
        <div className="title-short"><input className="search-field-short" type="number" placeholder="Price" value={price} onChange={(e) => {
            setPrice(e.target.value);
            dispatch(setFilters({filters: {...filters, price: "$" + e.target.value}}));
        }}></input></div>
        <div className="dropdown-container">
            <div className="title-long">{availability}</div>
            <div className="dropdown-menu-search">
                <div className="dropdown-menu-search-menu">
                    <div className="button" onClick={() => {
                        setAvailability("Available");
                        dispatch(setFilters({filters: {...filters, availability: true}}));
                    }}>+</div>
                    <div className="button" onClick={() => {
                        setAvailability("Availability");
                        dispatch(setFilters({filters: {...filters, availability: ""}}));
                    }}>?</div>
                    <div className="button" onClick={() => {
                        setAvailability("Not available");
                        dispatch(setFilters({filters: {...filters, availability: false}}));
                    }}>-</div>
                </div>
            </div>
        </div>
        <div className="title-short">Actions</div>
    </div>
}