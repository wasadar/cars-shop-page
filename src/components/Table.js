import React, { useState, useEffect } from 'react';
import AddCarPanel from "./Add-car-panel";
import axios from 'axios';
import Car from "./Car";
import PagesPanel from "./Pages-panel";
import SearchPanel from "./Search-panel";
import { useDispatch, useSelector } from 'react-redux';
import { setCars, changePage } from '../store/cars-slice';
import "./Table.css";
import Modal from './Modal';
import AddEditCar from './Add-edit-car';
import DeleteCar from './Delete-car';

export default function Table(){
    const cars = useSelector(state => state.cars);
    const page = useSelector(state => state.currentPage);
    const filters = useSelector(state => state.filters);
    const dispatch = useDispatch();

    useEffect(() => {
        if (cars.length === 0) {
            fetchData();
        }
    }, []);

    const filteredCars = cars.filter(car => {
        for (let filter in filters){
            if (filter != "availability" && filter != "car_model_year" && car[filter].indexOf(filters[filter])){
                return false;
            }
        }
        if ("availability" in filters && car.availability !== filters.availability){
            return false;
        }
        if ("car_model_year" in filters && String(car.car_model_year).indexOf(String(filters.car_model_year))){
            return false;
        }
        return true;
    });

    let list = [];
    if (page * 10 < filteredCars.length){
        list = filteredCars.slice(page * 10, (page + 1) * 10);
    } else {
        dispatch(changePage({page: 0}));
        list = filteredCars.slice(0, 10);
    }

    const fetchData = async () => {
        try {
            const response = await axios.get('https://myfakeapi.com/api/cars/');
            dispatch(setCars({cars: response.data.cars}));
        } catch (error) {
            console.error(error);
        }
    };

    const createOpenEditModal = (id) => {
        return () => {
            document.getElementById("edit" + id).classList.add('active');
        };
    };

    const createCloseEditModal = (id) => {
        return () => {
            document.getElementById("edit" + id).classList.remove('active');
        };
    };

    const createOpenDeleteModal = (id) => {
        return () => {
            document.getElementById("delete" + id).classList.add('active');
        };
    };

    const createCloseDeleteModal = (id) => {
        return () => {
            document.getElementById("delete" + id).classList.remove('active');
        };
    };

    return <div className="table">
        <SearchPanel />
        {list.map((car) => {
            return <div key={car.id}><Car {...car} onEdit={createOpenEditModal(car.id)} onDelete={createOpenDeleteModal(car.id)}/>
                <Modal id={"edit" + car.id} close={createCloseEditModal(car.id)}>
                    <AddEditCar carId={car.id} close={createCloseEditModal(car.id)}/>
                </Modal>
                <Modal id={"delete" + car.id} close={createCloseDeleteModal(car.id)}>
                    <DeleteCar carId={car.id} close={createCloseDeleteModal(car.id)}/>
                </Modal>
            </div>
        })}
        <AddCarPanel open={() => {document.getElementById("add").classList.add('active')}}/>
        <Modal id={"add"} close={() => {document.getElementById("add").classList.remove('active')}}>
            <AddEditCar close={() => {document.getElementById("add").classList.remove('active')}}/>
        </Modal>
        <PagesPanel lastPage={Math.trunc(filteredCars.length / 10) - 1} />
    </div>
}