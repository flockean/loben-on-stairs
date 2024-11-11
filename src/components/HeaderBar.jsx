import React from "react";

export default function HeaderBar(props) {
      

    return (
        <div className={`w-full mx-auto bg-white shadow-lg overflow-hidden ${props.style}`}>
            <div className="bg-purple-500 text-white p-3 text-center">
                {props.title}
            </div>
        </div>
    )
}