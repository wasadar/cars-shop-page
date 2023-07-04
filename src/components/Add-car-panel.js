import "./Add-car-panel.css";

export default function AddCarPanel(props){
    return <div className="add-car-panel">
        <div className="button" onClick={props.open}>Add car</div>
    </div>
}