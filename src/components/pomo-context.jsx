import React, { createContext, useContext, useState } from "react";

import SettingsContext from "./settings-context.jsx";

const PomoContext = createContext(null);

export default PomoContext;

export const PomoContextProvider = ({ children }) => {
	const [pomoState, setPomoState] = useState({
		isRunning: false,
		timerType: "work", //'work' || 'break'
		timerSeconds: 0,
		timerText: "00:00",
		progressPercent: 0,
		currentRep: 0,
		interval: null,
	});

	const { settings } = useContext(SettingsContext);

	const formatPomoSeconds = (pomodoroSeconds) => {
		let minutes = Math.floor(pomodoroSeconds / 60).toString();
		let seconds = (pomodoroSeconds % 60).toString();

		if (minutes.length < 2) {
			minutes = `0${minutes}`;
		}

		if (seconds.length < 2) {
			seconds = `0${seconds}`;
		}

		return `${minutes}:${seconds}`;
	};

	const onTick = () =>
		setPomoState((prevPomoState) => {
			const updatedPomoState = {
				...prevPomoState,
			};

			updatedPomoState.timerSeconds = prevPomoState.timerSeconds + 1;

			if (
				prevPomoState.timerType === "work" &&
				updatedPomoState.timerSeconds > settings.workDuration
			) {

				updatedPomoState.currentRep = prevPomoState.currentRep + 1;

				if(updatedPomoState.currentRep === settings.totalReps) {
					clearInterval(prevPomoState.interval);

					updatedPomoState.isRunning = false;
					updatedPomoState.timerType = "work";
					updatedPomoState.timerSeconds = 0;
					updatedPomoState.currentRep = 0;
					updatedPomoState.interval = null;
				} else {
					updatedPomoState.timerType = "break";
					updatedPomoState.timerSeconds = 0;
				}
			}

			if (
				prevPomoState.timerType === "break" &&
				updatedPomoState.timerSeconds > settings.breakDuration
			) {
				updatedPomoState.timerType = "work";
				updatedPomoState.timerSeconds = 0;
			}

			if(updatedPomoState.timerType === "work") {
				updatedPomoState.progressPercent = (updatedPomoState.timerSeconds / settings.workDuration) * 100;
			} else {
				updatedPomoState.progressPercent = (updatedPomoState.timerSeconds / settings.breakDuration) * 100;
			}

			updatedPomoState.timerText = formatPomoSeconds(updatedPomoState.timerSeconds);

			return updatedPomoState;
		});

	return (
		<PomoContext.Provider
			value={{
				pomoState,
				onPlay() {
					if (pomoState.isRunning === true) {
						console.error("Pomodoro timer is already running.");
					}

					setPomoState({
						...pomoState,
						isRunning: true,
						interval: setInterval(onTick, 1000),
					});
				},
				onPause() {
					if (pomoState.isRunning === false) {
						console.error("Pomodoro timer already paused.");
					}

					if (pomoState.interval !== null) {
						clearInterval(pomoState.interval);
					}

					setPomoState({
						...pomoState,
						isRunning: false,
						interval: null,
					});
				},
				onStop() {
					if (pomoState.interval !== null) {
						clearInterval(pomoState.interval);
					}

					setPomoState({
						...pomoState,
						isRunning: false,
						timerType: "work",
						timerSeconds: 0,
						timerText: "00:00",
						progressPercent: 0,
						currentRep: 0,
						interval: null,
					});
				},
			}}
		>
			{children}
		</PomoContext.Provider>
	);
};

// export default (pomodoroState, setPomodoroState) => {
// 	const formatPomodoroSeconds = (pomodoroSeconds) => {
// 		let minutes = Math.floor(pomodoroSeconds / 60).toString();
// 		let seconds = (pomodoroSeconds % 60).toString();

// 		if (minutes.length < 2) {
// 			minutes = `0${minutes}`;
// 		}

// 		if (seconds.length < 2) {
// 			seconds = `0${seconds}`;
// 		}

// 		return `${minutes}:${seconds}`;
// 	};

// 	const updatedPomodoroState = { ...pomodoroState };

// 	updatedPomodoroState.timerSeconds = pomodoroState.timerSeconds;

// 	if (updatedPomodoroState.timerSeconds > settings.workDuration) {
// 		updatedPomodoroState.currentRep = pomodoroState.currentRep + 1;
// 	}

// 	if (updatedPomodoroState.currentRep > settings.totalReps) {
// 		//TODO
// 	}

// 	console.log(updatedPomodoroState);

// 	return pomodoroState;
// };

//percent={(pomoState.timerSeconds / settings.workDuration) * 100}

// const formatPomodoroSeconds = (pomodoroSeconds) => {
// 	let minutes = Math.floor(pomodoroSeconds / 60).toString();
// 	let seconds = (pomodoroSeconds % 60).toString();

// 	if (minutes.length < 2) {
// 		minutes = `0${minutes}`;
// 	}

// 	if (seconds.length < 2) {
// 		seconds = `0${seconds}`;
// 	}

// 	return `${minutes}:${seconds}`;
// };
