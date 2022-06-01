import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default () => {
	const [isHamburgerActive, setIsHamburgerActive] = useState(false);

	const toggleHamburger = () => {
		setIsHamburgerActive(!isHamburgerActive);
	};

	const handleLogIn = async () => {
		toggleHamburger();
		const auth = getAuth();
		const provider = new GoogleAuthProvider();

		try {
			const result = await signInWithPopup(auth, provider);
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const user = result.user;
		} catch (err) {
			console.log(err);
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
						<button type="button" onClick={handleLogIn} className="button">
							Log In
						</button>
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
