import React from "react";

import ProgressBar from "../components/progress-bar.jsx";
import RepCounter from "../components/rep-counter.jsx";
import TodoList from "../components/todo-list.jsx";

import "../styles/home.scss";

export default () => {
	return (
		<div className="view">
			<div className="hero">
				<h1>Hello!</h1>
			</div>
			<div id="timer">
				<ProgressBar percent={75} time="15:00" />
				<RepCounter total={4} current={1} />
			</div>
			<div id="reminders">
				<TodoList heading={"Focus"} />
				<TodoList heading={"To Do"} />
			</div>
		</div>
	);
};
