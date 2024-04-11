// Forms/Field.js

import React from "react";

export const Field = ({ children, label, error }) => {
    const id = getChildId(children);

    return (
        <div className="mb-5">
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">
                {label}
            </label>
            {children}
            {error && <small className="error">{error.message}</small>}
        </div>
    );
};

// Get id prop from a child element
export const getChildId = (children) => {
    const child = React.Children.only(children);

    if ("id" in child?.props) {
        return child.props.id;
    }
};