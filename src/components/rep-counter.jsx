import React from "react";

export default ({ total, current }) => {
	const elements = [];

	for (let i = 0; i < total; ++i) {
		if (i < current) {
			elements.push(<span className="complete"></span>);
		} else {
			elements.push(<span></span>);
		}
	}

	return <div className="rep-counter">{elements}</div>;
};
