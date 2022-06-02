import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
} from "firebase/auth";

import { UserContext } from "./context";

export default () => {
	const [isHamburgerActive, setIsHamburgerActive] = useState(false);

	const [user] = useContext(UserContext);

	const toggleHamburger = () => {
		setIsHamburgerActive(!isHamburgerActive);
	};

	const handleAuth = async () => {
		toggleHamburger();

		if (user === null) {
			return;
		}

		const auth = getAuth();

		if (user === false) {
			const provider = new GoogleAuthProvider();

			try {
				await signInWithPopup(auth, provider);
			} catch (err) {
				console.log(err);
			}
		} else {
			try {
				await signOut(auth);
			} catch (err) {
				console.log(err);
			}
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
							Home
						</Link>
					</li>
					<li>
						<Link to="/settings" onClick={toggleHamburger}>
							Settings
						</Link>
					</li>
					<li>
						<button type="button" onClick={handleAuth} className="button">
							{user ? "Sign Out" : "Log In"}
						</button>
					</li>
					<li>
						<a href="https://www.buymeacoffee.com/snowfoxstudio" target="_blank" className="button">
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
