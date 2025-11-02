import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import LadrarImageUrl from "../assets/img/Perrito.jpg";

export const Welcome = () => {
    return (
    <div className="card" style={"width 18rem"}>
        <img src={LadrarImageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>

        </div>
    </div>
  );
}
  
export default Welcome;