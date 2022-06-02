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
import { UserContext, SettingsContext } from "../components/context.jsx";
import Controls from "../components/controls.jsx";

export default () => {
	const [focusList, setFocusList] = useState([]);
	const [backlog, setBacklog] = useState([]);
	const [time, setTime] = useState(0);
	const [reps, setReps] = useState(0);
	const [pomoInterval, setPomoInterval] = useState(null);

	const [user] = useContext(UserContext);
	const [settings] = useContext(SettingsContext);

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

		const interval = setInterval(() => {
			setTime((prevTime) => {
				const updatedTime = prevTime + 60;

				if(updatedTime >= settings.workDuration) {
					clearInterval(interval);
					return 0;
				} else {
					return updatedTime;
				}
			});
		}, 1000);

		setPomoInterval(interval);
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

	const formatTime = () => {
		let minutes = Math.floor(time / 60).toString();
		let seconds = (time % 60).toString();

		if (minutes.length < 2) {
			minutes = `0${minutes}`;
		}

		if (seconds.length < 2) {
			seconds = `0${seconds}`;
		}

		return `${minutes}:${seconds}`;
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
			<ProgressRing
				percent={(time / settings.workDuration) * 100}
				time={formatTime()}
			/>
			<RepCounter total={settings.reps} current={reps} />
			<Controls />
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
