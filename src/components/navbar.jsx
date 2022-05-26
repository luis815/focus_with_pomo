import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import "../styles/navbar.scss";

export default () => {
	const [isHamburgerActive, setIsHamburgerActive] = useState(false);

	const toggleHamburger = () => {
		setIsHamburgerActive(!isHamburgerActive);
	};

	return <nav></nav>;
};
