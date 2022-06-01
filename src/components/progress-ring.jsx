import React from "react";

export default ({ percent, time }) => {
	return (
		<div className="progress-ring">
			<svg viewBox="-5 -5 110 110" xmlns="http://www.w3.org/2000/svg">
				<circle cx="50" cy="50" r="50" />
				<circle
					className="foreground"
					cx="50"
					cy="50"
					r="50"
					style={{
						strokeDashoffset: 314 - (314 * percent) / 100,
					}}
				/>
			</svg>
			<span>{time}</span>
		</div>
	);
};
