import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../store/cars-slice';
import "./Pages-panel.css";

export default function PagesPanel(props){
    const dispatch = useDispatch();
    const page = useSelector(state => state.currentPage);

    return <div className="pages-panel">
        <div className="button" onClick={() => {
            if (!(page - 1 < 0)){
                dispatch(changePage({page:(page - 1)}))
            }
        }}>{"<"}</div>
        <div className="page">{page + 1} / {props.lastPage + 1}</div>
        <div className="button" onClick={() => {
            if (!(page + 1 > props.lastPage)){
                dispatch(changePage({page:(page + 1)}))
            }
        }}>{">"}</div>
    </div>
}