import React from "react";

export default ({ total, current }) => {
	const elements = [];

	for (let i = 0; i < total; ++i) {
		if (i < current) {
			elements.push(<span className="complete" key={i}></span>);
		} else {
			elements.push(<span key={i}></span>);
		}
	}

	return <div className="rep-counter">{elements}</div>;
};
