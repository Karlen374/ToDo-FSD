import React from "react";
import Routing from "./routing/Routing";
import { ToDoProvider } from "@features/ToDoProvider";
import { ErrorBoundary } from "@features/ErrorBoundary";
import { Header } from "@widgets/Header";

const App = () => {

	return (
		<ErrorBoundary >
			<ToDoProvider>
				<Header/>
				<Routing />
			</ToDoProvider>
		</ErrorBoundary>
	);
};
export default App;