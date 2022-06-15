import React from "react";

export default ({ isRunning, sound, onPlay, onPause, onStop, onToggleSound }) => {
	return (
		<div className="controls">
			<button type="button" onClick={onStop}>
				<i className="fa-solid fa-stop"></i>
			</button>
			<button type="button" onClick={ isRunning ? onPause : onPlay}>
				{isRunning ? (
					<i className="fa-solid fa-pause"></i>
				) : (
					<i className="fa-solid fa-play"></i>
				)}
			</button>
			<button type="button" onClick={onToggleSound}>
				{sound ? (
					<i className="fa-solid fa-volume-high"></i>
				) : (
					<i className="fa-solid fa-volume-xmark"></i>
				)}
			</button>
		</div>
	);
};
