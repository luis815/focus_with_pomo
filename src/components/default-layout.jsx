import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/navbar.jsx";

export default () => {
	return (
		<div className="default-layout">
			<Navbar />
			<div className="view">
				<Outlet />
			</div>
		</div>
	);
};
