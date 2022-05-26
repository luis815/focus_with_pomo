import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import "../styles/navbar.scss";

export default () => {
	const [isHamburgerActive, setIsHamburgerActive] = useState(false);

	const toggleHamburger = () => {
		setIsHamburgerActive(!isHamburgerActive);
	};

	return (
		<nav>
			<div
				className={classNames({ directory: true, active: isHamburgerActive })}
			>
				<ul>
					<li>
						<Link to="/" onClick={toggleHamburger}>
							Home
						</Link>
					</li>
					<li>
						<Link to="/settings" onClick={toggleHamburger}>
							Settings
						</Link>
					</li>
					<li>
						<Link to="/" onClick={toggleHamburger} className="button">
							Log In
						</Link>
					</li>
					<li>
						<a href="#" target="_blank" className="button">
							Buy me a Coffee
						</a>
					</li>
				</ul>
			</div>
			<div className="bar">
				<div className="brand">
					<img src="/focus-with-pomo.svg" />
					<div className="text">
						<span>Focus</span>
						<span>with</span>
						<span>Pomo</span>
					</div>
				</div>
				<div
					className={classNames({ burger: true, active: isHamburgerActive })}
					onClick={toggleHamburger}
				>
					<span />
				</div>
			</div>
		</nav>
	);
};
