import React from "react";

export default ({ percent }) => {
	return (
		<div className="progress-container">
			<svg viewBox="-5 -5 110 110" xmlns="http://www.w3.org/2000/svg">
				<circle cx="50" cy="50" r="50" />
				<circle
					className="foreground"
					cx="50"
					cy="50"
					r="50"
					style={{
						strokeDashoffset: `calc(625px - (625px * ${50}) / 100)`,
					}}
				/>
			</svg>
		</div>
	);
};
