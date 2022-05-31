import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/navbar.jsx";

import "../styles/default-layout.scss";

export default () => {
	return (
		<Fragment>
			<Navbar />
			<Outlet />
		</Fragment>
	);
};
