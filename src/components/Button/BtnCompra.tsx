import React from "react";
import "./BtnCompra.css";

type Props = {
    click: () => void;
}

const BtnCompra: React.FC<Props> = ({click}) => {
    return (
        <div className="btn" onClick={click}>
            <h2>Realizar compra</h2>
        </div>
    )
}

export default BtnCompra