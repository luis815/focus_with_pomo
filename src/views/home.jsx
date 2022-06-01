import React, { Fragment } from "react";

import ProgressRing from "../components/progress-ring.jsx";
import RepCounter from "../components/rep-counter.jsx";
import TodoList from "../components/todo-list.jsx";

import "../styles/home.scss";

export default () => {
	return (
		<Fragment>
			<div className="hero">
				<h1>Hello!</h1>
			</div>
			<ProgressRing percent={75} time="15:00" />
			<RepCounter total={4} current={1} />
			<TodoList heading={"Focus"} />
			<TodoList heading={"To Do"} />
		</Fragment>
	);
};
