import React, { Fragment } from "react";

import ProgressBar from "../components/progress-bar.jsx";

import "../styles/home.scss";

export default () => {
	return (
		<Fragment>
			<div id="greeting">
				<h1>Hello!</h1>
			</div>
			<div id="timer">
				<ProgressBar />
			</div>
			<div id="reminders"></div>
		</Fragment>
	);
};
