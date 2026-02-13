// src/context/StateContext.js
import React, { createContext, useState } from 'react';

export const StateContext = createContext(); // Ensure this line is present

export const StateProvider = ({ children }) => {
    const [state, setState] = useState({}); // Initialize state as an object

    return (
        <StateContext.Provider value={{ state, setState }}>
            {children}
        </StateContext.Provider>
    );
};
