import "./Car.css";

export default function Car(props){
    return <div className="car-block">
        <div className="property-long">{props.car}</div>
        <div className="property-long">{props.car_model}</div>
        <div className="property-long">{props.car_vin}</div>
        <div className="property-short">{props.car_color}</div>
        <div className="property-short">{props.car_model_year}</div>
        <div className="property-short">{props.price}</div>
        <div className="property-long">{props.availability ? "Available" : "Not available"}</div>
        <div className="dropdown-container">
            <div className="property-short">Actions</div>
            <div className="dropdown-menu">
                <div className="dropdown-menu-item" onClick={props.onEdit}>Edit</div>
                <div className="dropdown-menu-item" onClick={props.onDelete}>Delete</div>
            </div>
        </div>
    </div>
}