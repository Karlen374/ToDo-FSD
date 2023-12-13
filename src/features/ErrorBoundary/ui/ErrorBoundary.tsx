
import React, { FC, useState, createContext } from "react";
import { IErrorBoundaryProps, IErrorBoundaryContext  } from "../types/IErrorBoundary";
import { ErrorAlert} from "@entities/ErrorAlert";

export const ErrorContext = createContext<null | IErrorBoundaryContext>(null);

export const ErrorBoundary:FC<IErrorBoundaryProps> = ({ children }) => {
	const [active, setActive] = useState(false);
	const [errorMessage, setErrorMessage] = useState("Error checking");

	return ( 
		<ErrorContext.Provider value={{active, setActive, errorMessage, setErrorMessage}}>
			{active && <ErrorAlert active={active} errorMessage={errorMessage} setActive={setActive}/>}
			{children}
		</ErrorContext.Provider>
	);
};