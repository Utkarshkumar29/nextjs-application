import React from "react";
import loader from "../../profile/spinner.gif";

const Spinner = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <img src={loader} alt="loading.." />
        </div>
    );
};

export default Spinner;