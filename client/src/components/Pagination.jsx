import React, { useState } from "react";
import {Button,Modal} from "reactstrap";

export const Pagination = ({page, setPage, maximum}) => {

    const [control, setControl] = useState(1)

    const nextPage = () => {
        setControl(control + 1);
        setPage(page + 1);
    };

    const previousPage = () => {
        setControl(control - 1);
        setPage(page - 1);
    };

    return(
        <div className="butonbtn">
            <button className="buton" disabled={page ===1 || page < 1} onClick={previousPage}>previous</button>
            <button className="buton1" >{control}</button>
            <button className="buton" disable={page === 36|| page > 36} onClick={nextPage}>after</button>
        </div>
    )
        
}