import {createSlice} from "@reduxjs/toolkit";

const carsSlice = createSlice({
    name: 'cars',
    initialState:{
        cars: [],
        currentPage: 0,
        lastPage: 0,
        nextId: 0,
        filters: {}
    },
    reducers:{
        setCars(state,action) {
            state.cars = action.payload.cars;
            state.lastPage = Math.trunc(state.cars.length / 10) - 1;
            state.nextId = state.cars[state.cars.length - 1].id + 1;
        },
        addCar(state, action) {
            let car = action.payload.car;
            car.id = state.nextId;
            state.nextId += 1;
            state.cars.push(action.payload.car);
            if (state.cars.length > (state.lastPage + 1) * 10){
                state.lastPage += 1;
                if (state.currentPage == -1) {
                    state.currentPage += 1;
                }
            }
        },
        changeCar(state, action) {
            for (let index = 0; index < state.cars.length; index++){
                if (state.cars[index].id === action.payload.id) {
                    state.cars[index] = action.payload.car;
                    state.cars[index].id = action.payload.id;
                }
            }
        },
        deleteCar(state, action) {
            for (let index = 0; index < state.cars.length; index++){
                if (state.cars[index].id === action.payload.id) {
                    state.cars.splice(index,1);
                    break;
                }
            }
            if (state.cars.length <= (state.lastPage) * 10){
                state.lastPage -= 1;
                if (state.currentPage > state.lastPage){
                    state.currentPage-= 1;
                }
            }
        },
        changePage(state, action) {
            if (action.payload.page <= state.lastPage && action.payload.page >= 0){
                state.currentPage = action.payload.page;
            }
        },
        setFilters(state, action) {
            state.filters = action.payload.filters;
            for (let filter in state.filters){
                if (state.filters[filter] === "" 
                || (filter === "price" && state.filters[filter] === "$")){
                    delete state.filters.filter;
                }
            }
        }
    }
});

export const {setCars, addCar, changeCar, deleteCar, changePage, setFilters} = carsSlice.actions;
export default carsSlice.reducer;