import React from "react";

export default ({ heading, list, setList }) => {
	return (
		<div className="todo-list">
			<h2>{heading}</h2>
			<div className="list">
				<div className="item-container">
					<input
						type="text"
						autoCapitalize="true"
						autoComplete="true"
						autoCorrect="true"
					/>
					<button>+</button>
				</div>
				<div className="item-container">
					<input
						type="text"
						autoCapitalize="true"
						autoComplete="true"
						autoCorrect="true"
					/>
					<button className="new">+</button>
				</div>
			</div>
		</div>
	);
};
