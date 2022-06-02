import React, { useState, useEffect, useContext, Fragment } from "react";
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	serverTimestamp,
	updateDoc,
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
		if (user === null) {
			return;
		} else if (user === false) {
			let value = localStorage.getItem("home");

			if (value === null) {
				value = {
					focusList: [],
					backlog: [],
				};
				localStorage.setItem("home", JSON.stringify(value));
			} else {
				value = JSON.parse(value);
			}

			setFocusList(value.focusList);
			setBacklog(value.backlog);
		} else {
			const db = getFirestore();
			const docRef = doc(db, "users", user.uid);

			const helper = async () => {
				let docSnap = await getDoc(docRef);

				if (!docSnap.exists()) {
					await setDoc(docRef, {
						created: serverTimestamp(),
						focusList: [],
						backlog: [],
					});

					docSnap = await getDoc(docRef);
				}

				const data = docSnap.data();

				setFocusList(data.focusList);
				setBacklog(data.backlog);
			};

			helper();
		}
	}, [user]);

	const buildListHandler = (key, setList) => {
		return async (updatedList) => {
			setList(updatedList);

			if (user === null) {
				return;
			} else if (user === false) {
				const value = JSON.parse(localStorage.getItem("home"));
				value[key] = updatedList;
				localStorage.setItem("home", JSON.stringify(value));
			} else {
				const firestoreUpdate = new Object();
				firestoreUpdate[key] = updatedList;

				const db = getFirestore();
				const docRef = doc(db, "users", user.uid);

				try {
					await updateDoc(docRef, firestoreUpdate);
				} catch (err) {
					console.log(err);
				}
			}
		};
	};

	return (
		<div className="home">
			<div className="hero">
				{user ? (
					<Fragment>
						<h2>Welcome back,</h2>
						<h1>Luis Lopez Cardona</h1>
					</Fragment>
				) : (
					<h1>Hello!</h1>
				)}
			</div>
			<ProgressRing percent={75} time="15:00" />
			<RepCounter total={4} current={1} />
			<Reminders
				heading={"Focus"}
				list={focusList}
				setList={buildListHandler("focusList", setFocusList)}
			/>
			<Reminders
				heading={"Backlog"}
				list={backlog}
				setList={buildListHandler("backlog", setBacklog)}
			/>
		</div>
	);
};
