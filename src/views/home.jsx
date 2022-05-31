import React, { Fragment } from "react";

import ProgressBar from "../components/progress-bar.jsx";
import RepCounter from "../components/rep-counter.jsx";

import "../styles/home.scss";

export default () => {
	return (
		<Fragment>
			<div id="greeting">
				<h1>Hello!</h1>
			</div>
			<div id="timer">
				<ProgressBar percent={75} time="15:00" />
				<RepCounter total={4} current={1} />
			</div>
			<div id="reminders"></div>
		</Fragment>
	);
};
