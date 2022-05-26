import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/navbar.jsx";

export default () => {
	return (
		<Fragment>
			<Navbar />
			<Outlet />
		</Fragment>
	);
};
