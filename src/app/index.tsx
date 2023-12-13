import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);