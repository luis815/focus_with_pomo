import React from "react";
import { Link } from "react-router-dom";

export default () => {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/settings">Settings</Link>
				</li>
			</ul>
			<ul>
				<li>
					<button type="button">Sign In</button>
				</li>
				<li>
					<button type="button">Dark Mode</button>
				</li>
				<li>
					<button type="button">Buy Me a Coffee</button>
				</li>
			</ul>
		</nav>
	);
};
