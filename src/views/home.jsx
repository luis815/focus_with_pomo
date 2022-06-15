import React, { useState, useContext, Fragment } from "react";

import UserContext from "../components/user-context.jsx";
import RemindersContext from "../components/reminders-context.jsx";
import PomoContext from "../components/pomo-context.jsx";
import SettingsContext from "../components/settings-context.jsx";

import Controls from "../components/controls.jsx";
import ProgressRing from "../components/progress-ring.jsx";
import Reminders from "../components/reminders.jsx";
import RepCounter from "../components/rep-counter.jsx";

export default () => {
	const { user } = useContext(UserContext);
	const { reminders, updateFocus, updateBacklog } =
		useContext(RemindersContext);
	const { pomoState } = useContext(PomoContext);
	const { settings } = useContext(SettingsContext);

	return (
		<div className="home">
			<div className="hero">
				{user ? (
					<Fragment>
						<h1>Welcome back,</h1>
						<h2>{user.displayName}</h2>
					</Fragment>
				) : (
					<h1>Hello!</h1>
				)}
			</div>
			<ProgressRing
				percent={pomoState.progressPercent}
				time={pomoState.timerText}
			/>
			<RepCounter total={settings.totalReps} current={pomoState.currentRep} />
			<Controls
				isRunning={false}
				sound={false}
				onPlay={() => null}
				onPause={() => null}
				onStop={() => null}
				onToggleSound={() => null}
			/>
			<Reminders
				heading={"Focus"}
				list={reminders.focus}
				setList={updateFocus}
			/>
			<Reminders
				heading={"Backlog"}
				list={reminders.backlog}
				setList={updateBacklog}
			/>
		</div>
	);
};
