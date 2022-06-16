import React, { useState, useContext, useEffect } from "react";

import SettingsContext from "../components/settings-context.jsx";
import PomoContext from "../components/pomo-context.jsx";

export default () => {
	const { settings, updateSettings } = useContext(SettingsContext);
	const { pomoState } = useContext(PomoContext);

	const [values, setValues] = useState({
		workDuration: settings.workDuration,
		breakDuration: settings.breakDuration,
		totalReps: settings.totalReps,
	});

	useEffect(() => {
		setValues(settings);
	}, [settings]);

	const handleUpdate = () => {
		if (pomoState.isRunning === false) {
			updateSettings(values);
		}
	};

	return (
		<div className="settings">
			<div className="hero">
				<h1>Settings</h1>
			</div>
			<div className="settings-container">
			<div className="setting-block">
					<span className="setting-label">Work Duration</span>
					<div className="range-container">
						<input
							disabled={pomoState.isRunning}
							type="range"
							min="15"
							max="60"
							value={values.workDuration / 60}
							onChange={(e) =>
								setValues({ ...values, workDuration: e.target.value * 60 })
							}
							onTouchEnd={handleUpdate}
							onMouseUp={handleUpdate}
						/>
						<span>{values.workDuration / 60} min</span>
					</div>
				</div>
				<div className="setting-block">
					<span className="setting-label">Break Duration</span>
					<div className="range-container">
						<input
							disabled={pomoState.isRunning}
							type="range"
							min="1"
							max="15"
							value={values.breakDuration / 60}
							onChange={(e) =>
								setValues({ ...values, breakDuration: e.target.value * 60 })
							}
							onTouchEnd={handleUpdate}
							onMouseUp={handleUpdate}
						/>
						<span>{values.breakDuration / 60} min</span>
					</div>
				</div>
				<div className="setting-block">
					<span className="setting-label">Total Reps</span>
					<div className="range-container">
						<input
							disabled={pomoState.isRunning}
							type="range"
							min="2"
							max="5"
							value={values.totalReps}
							onChange={(e) =>
								setValues({ ...values, totalReps: e.target.value })
							}
							onTouchEnd={handleUpdate}
							onMouseUp={handleUpdate}
						/>
						<span>{values.totalReps} reps</span>
					</div>
				</div>
			</div>
		</div>
	);
};
