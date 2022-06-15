import React, { createContext, useContext, useEffect, useState } from "react";
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore";

import UserContext from "./user-context";

const RemindersContext = createContext(null);

export default RemindersContext;

export const RemindersContextProvider = ({ children }) => {
	const [reminders, setReminders] = useState({
		focus: [],
		backlog: [],
	});

	const { user } = useContext(UserContext);

	useEffect(() => {
		let localStorageReminders = localStorage.getItem("reminders");

		if (localStorageReminders === null) {
			localStorageReminders = reminders;
		} else {
			JSON.parse(localStorageReminders);
		}

		switch (user) {
			case null:
				break;
			case false:
				setReminders(localStorageReminders);
				break;
			default:
				const db = getFirestore();
				const docRef = doc(db, "users", user.uid);

				const firestoreHandler = async () => {
					let docSnap = await getDoc(docRef);

					if (!docSnap.exists()) {
						await setDoc(docRef, {
							created: serverTimestamp(),
							focus: [],
							backlog: [],
						});

						docSnap = await getDoc(docRef);
					}

					const data = docSnap.data();

					setReminders(data);
				};

				firestoreHandler();
				break;
		}
	}, [user]);

	return (
		<RemindersContext.Provider
			value={{
				reminders,
				async updateFocus(updatedFocus) {
					const updatedReminders = { ...reminders, focus: updatedFocus };
					setReminders(updatedReminders);
					localStorage.setItem("reminders", JSON.stringify(updatedReminders));

					if (user) {
						const db = getFirestore();
						const docRef = doc(db, "users", user.uid);

						try {
							await updateDoc(docRef, { focus: updatedFocus });
						} catch (err) {
							console.log(err);
						}
					}
				},
				async updateBacklog(updatedBacklog) {
					const updatedReminders = { ...reminders, backlog: updatedBacklog };
					setReminders(updatedReminders);
					localStorage.setItem("reminders", JSON.stringify(updatedReminders));

					if (user) {
						const db = getFirestore();
						const docRef = doc(db, "users", user.uid);

						try {
							await updateDoc(docRef, { backlog: updatedBacklog });
						} catch (err) {
							console.log(err);
						}
					}
				},
			}}
		>
			{children}
		</RemindersContext.Provider>
	);
};
