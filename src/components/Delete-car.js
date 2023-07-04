import { deleteCar } from '../store/cars-slice';
import { useDispatch} from 'react-redux';
import "./Delete-car.css";

export default function DeleteCar(props){
    const dispatch = useDispatch();

    return <div className="delete-car">
        <div className="warning-block">
            Do you want to delete this car?
        </div>
        <div className="confirm-block">
            <div className="button" onClick={() => {
                dispatch(deleteCar({id: props.carId}));
                props.close();
            }}>Yes</div>
            <div className="button"onClick={() => {
                props.close();
            }}>No</div>
        </div>
    </div>
}