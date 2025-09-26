import React from "react";
import './CardContainer.css'

interface CardContainerProps{
    children: React.ReactNode;
}

const CardContainer: React.FC<CardContainerProps> = ({ children }) => {
    return(
        <div className ="card-container-wrapper">
            <div className="card-container-content">
                {children}
            </div>
        </div>
    );
};

export default CardContainer;