import React, { useState, useEffect, useContext, Fragment } from "react";
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	serverTimestamp,
} from "firebase/firestore";

import ProgressRing from "../components/progress-ring.jsx";
import RepCounter from "../components/rep-counter.jsx";
import Reminders from "../components/reminders.jsx";
import { UserContext } from "../components/context.jsx";

export default () => {
	const [focusList, setFocusList] = useState([]);
	const [backlog, setBacklog] = useState([]);

	const [user] = useContext(UserContext);

	useEffect(() => {
		if (user !== null) {
			const db = getFirestore();
			const docRef = doc(db, "users", user.uid);

			getDoc(docRef).then((docSnap) => {
				if (!docSnap.exists()) {
					setDoc(docRef, { created: serverTimestamp(), focusList, backlog });
				}
			});
		}
	}, [user]);

	return (
		<div className="home">
			<div className="hero">
				{user === null ? (
					<h1>Hello!</h1>
				) : (
					<Fragment>
						<h2>Welcome back,</h2>
						<h1>Luis Lopez Cardona</h1>
					</Fragment>
				)}
			</div>
			<ProgressRing percent={75} time="15:00" />
			<RepCounter total={4} current={1} />
			<Reminders heading={"Focus"} list={focusList} setList={setFocusList} />
			<Reminders heading={"Backlog"} list={backlog} setList={setBacklog} />
		</div>
	);
};
