import React, { Fragment } from "react";

import "../styles/home.scss";


export default () => {
	return (
		<Fragment>
			<div id="greeting">
				<h1>Hello!</h1>
			</div>
			<div id="timer"></div>
			<div id="reminders"></div>
		</Fragment>
	);
};
