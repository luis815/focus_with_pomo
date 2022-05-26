import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DefaultLayout from "./layouts/default.jsx";

import HomeView from "./views/home.jsx";
import SettingsView from "./views/settings.jsx";
import PageNotFoundView from "./views/page-not-found.jsx";

import "./styles/base.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route element={<DefaultLayout />}>
					<Route path="/settings" element={<SettingsView />} />
					<Route path="/" element={<HomeView />} />
				</Route>
				<Route path="*" element={<PageNotFoundView />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
