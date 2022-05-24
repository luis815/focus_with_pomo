import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import "../scss/navbar.scss";

export default () => {
	const [isHamburgerActive, setIsHamburgerActive] = useState(false);

	const toggleHamburger = () => {
		setIsHamburgerActive(!isHamburgerActive);
	};

	return (
		<nav>
			<div className="brand">
				<img src="/focus-with-pomo.svg" alt="Focus with Pomo logo" />
				<div>
					<span>Focus</span> <span>with</span> <span>Pomo</span>
				</div>
			</div>
			<button
				className={classNames({ hamburger: true, active: isHamburgerActive })}
				onClick={toggleHamburger}
			>
				<span />
			</button>
			<div className="directory">
				<ul className="views">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/settings">Settings</Link>
					</li>
				</ul>
				<ul className="actions">
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
			</div>
		</nav>
	);
};
