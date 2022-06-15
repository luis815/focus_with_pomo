import React, { createContext, useState } from "react";

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

	return (
		<PomoContext.Provider value={{ pomoState }}>
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


// const handleStop = () => {
// 	const updatedPomodoroState = {
// 		...pomodoroState,
// 		isRunning: false,
// 		timerType: "work",
// 		timerSeconds: 0,
// 		timerText: "00:00",
// 		progressPercent: 0,
// 		currentRep: 0,
// 	};

// 	if (pomodoroState.interval !== null) {
// 		clearInterval(pomodoroState.interval);
// 	}

// 	updatedPomodoroState.interval = null;

// 	setPomodoroState(updatedPomodoroState);
// };

// const handlePlayPause = () => {
// 	if (pomodoroState.isRunning) {
// 		const updatedPomodoroState = { ...pomodoroState, isRunning: false };

// 		clearInterval(pomodoroState.interval);

// 		updatedPomodoroState.interval = null;

// 		setPomodoroState(updatedPomodoroState);
// 	} else {
// 		const updatedPomodoroState = { ...pomodoroState, isRunning: true };

// 		updatedPomodoroState.interval = setInterval(
// 			pomodoroState.handleTick,
// 			1000
// 		);

// 		setPomodoroState(updatedPomodoroState);
// 	}
// };

// const handleSound = () => {
// 	setSettings({ ...settings, sound: !settings.sound });
// };
