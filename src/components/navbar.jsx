import React, { useState, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import UserContext from "./user-context.jsx";

export default () => {
	const [isHamburgerActive, setIsHamburgerActive] = useState(false);

	const { user, signIn, signOut } = useContext(UserContext);

	const toggleHamburger = () => setIsHamburgerActive(!isHamburgerActive);

	const handleAuth = async () => {
		toggleHamburger();

		switch (user) {
			case null:
				break;
			case false:
				await signIn();
				break;
			default:
				await signOut();
		}
	};

	return (
		<nav className="navbar">
			<div
				className={classNames({ directory: true, active: isHamburgerActive })}
			>
				<ul>
					<li>
						<Link to="/" onClick={toggleHamburger}>
							<i className="fa-solid fa-house"></i>
							<span>Home</span>
						</Link>
					</li>
					<li>
						<Link to="/settings" onClick={toggleHamburger}>
							<i className="fa-solid fa-gear"></i>
							<span>Settings</span>
						</Link>
					</li>
					<li>
						<button type="button" onClick={handleAuth} className="button">
							{user ? (
								<Fragment>
									<i className="fa-solid fa-right-from-bracket"></i>
									<span>Sign Out</span>
								</Fragment>
							) : (
								<Fragment>
									<i className="fa-solid fa-right-to-bracket"></i>
									<span>Log In</span>
								</Fragment>
							)}
						</button>
					</li>
					<li>
						<a
							href="https://www.buymeacoffee.com/snowfoxstudio"
							target="_blank"
							className="button"
						>
							<i className="fa-solid fa-hand-holding-dollar"></i>
							<span>Buy me a Coffee</span>
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
