import React from "react";
import Routing from "./routing/Routing";
import { Header } from "@modules/Header";
import { AppOptimizedProvider } from "@shared/store";
import { ToDoWrapper } from "@modules/ToDoWrapper";

const App = () => {
	return (
		<AppOptimizedProvider store={{errorMessage: "", active: false, tasks: null, categories: null}}>
			<ToDoWrapper>
				<Header/>
				<Routing />
			</ToDoWrapper>
		</AppOptimizedProvider>
	);
};
export default App;