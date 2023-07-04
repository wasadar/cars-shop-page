import "./Modal.css";

export default function Modal({id, children, close}){
    return <div className="modal" id={id}>
        <div className="modal-content">
          <div className="close-button-wrapper">
            <div className="close-button" onClick={close}>
              Close
            </div>
          </div>
          {children}
        </div>
    </div>
}