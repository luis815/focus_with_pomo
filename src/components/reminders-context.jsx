import React, { createContext, useEffect, useState } from "react";
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore";

const RemindersContext = createContext(null);

export default RemindersContext;

export const RemindersContextProvider = ({ children }) => {
	const [reminders, setReminders] = useState({
		focus: [],
		backlog: [],
	});

	useEffect(() => {}, []);
	return (
		<RemindersContext.Provider
			value={{ reminders, updateFocus() {}, updateBacklog() {} }}
		>
			{children}
		</RemindersContext.Provider>
	);
};

// useEffect(() => {
	// 	if (user === null) {
	// 		return;
	// 	} else if (user === false) {
	// 		let value = localStorage.getItem("home");

	// 		if (value === null) {
	// 			value = {
	// 				focusList: [],
	// 				backlog: [],
	// 			};
	// 			localStorage.setItem("home", JSON.stringify(value));
	// 		} else {
	// 			value = JSON.parse(value);
	// 		}

	// 		setFocusList(value.focusList);
	// 		setBacklog(value.backlog);
	// 	} else {
	// 		const db = getFirestore();
	// 		const docRef = doc(db, "users", user.uid);

	// 		const helper = async () => {
	// 			let docSnap = await getDoc(docRef);

	// 			if (!docSnap.exists()) {
	// 				await setDoc(docRef, {
	// 					created: serverTimestamp(),
	// 					focusList: [],
	// 					backlog: [],
	// 				});

	// 				docSnap = await getDoc(docRef);
	// 			}

	// 			const data = docSnap.data();

	// 			setFocusList(data.focusList);
	// 			setBacklog(data.backlog);
	// 		};

	// 		helper();
	// 	}
	// }, [user]);

    	// const buildListHandler = (key, setList) => {
	// 	return async (updatedList) => {
	// 		setList(updatedList);

	// 		if (user === null) {
	// 			return;
	// 		} else if (user === false) {
	// 			const value = JSON.parse(localStorage.getItem("home"));
	// 			value[key] = updatedList;
	// 			localStorage.setItem("home", JSON.stringify(value));
	// 		} else {
	// 			const firestoreUpdate = new Object();
	// 			firestoreUpdate[key] = updatedList;

	// 			const db = getFirestore();
	// 			const docRef = doc(db, "users", user.uid);

	// 			try {
	// 				await updateDoc(docRef, firestoreUpdate);
	// 			} catch (err) {
	// 				console.log(err);
	// 			}
	// 		}
	// 	};
	// };
